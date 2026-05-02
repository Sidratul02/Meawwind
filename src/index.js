import applyStyles from "./core/apply.js";
import { initMutationObserver } from "./core/observer.js";
import { splitClassName } from "./core/parser.js";
import { chaiClassScanner } from "./core/scanner.js";

const modifiers = ["focus"];

const applyHover = (element, className) => {
  const baseClassName = className.replace("hover:", "");
  const parts = splitClassName(baseClassName);
  if (!parts) return;

  const dummy = document.createElement("div");
  applyStyles(dummy, parts);
  const hoverStyles = {};
  for (let i = 0; i < dummy.style.length; i++) {
    const prop = dummy.style[i];
    hoverStyles[prop] = dummy.style.getPropertyValue(prop);
  }

  let originalStyles = {};

  element.addEventListener("mouseenter", () => {
    for (const prop in hoverStyles) {
      originalStyles[prop] = element.style.getPropertyValue(prop);
      element.style.setProperty(prop, hoverStyles[prop], "important");
    }
  });

  element.addEventListener("mouseleave", () => {
    for (const prop in originalStyles) {
      if (originalStyles[prop]) {
        element.style.setProperty(prop, originalStyles[prop]);
      } else {
        element.style.removeProperty(prop);
      }
    }
    originalStyles = {};
  });
};

const applyVariant = (className, variant) => {
  const baseClassName = className.replace(`${variant}:`, "");
  const parts = splitClassName(baseClassName);
  if (!parts) return;
  const dummy = document.createElement("div");
  applyStyles(dummy, parts);

  if (dummy.style.length === 0) return;

  let cssText = "";
  for (let i = 0; i < dummy.style.length; i++) {
    const prop = dummy.style[i];
    const value = dummy.style.getPropertyValue(prop);
    const priority = dummy.style.getPropertyPriority(prop);
    cssText += `${prop}: ${value}${priority ? " !important" : ""};`;
  }

  const escapedClassName = CSS.escape(className);
  const styleId = `chai-style-${escapedClassName}`;

  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `.${escapedClassName}:${variant} { ${cssText} }`;
    document.head.appendChild(style);
  }
};

const initStyles = () => {
  const chaiElements = chaiClassScanner();
  chaiElements.forEach((element) => {
    element.classList.forEach((className) => {
      if (className.startsWith("hover:chai-")) {
        applyHover(element, className);
        return;
      }

      for (const modifier of modifiers) {
        if (className.startsWith(`${modifier}:chai-`)) {
          applyVariant(className, modifier);
          return;
        }
      }

      if (!className.startsWith("chai-")) {
        return;
      }
      const classNameParts = splitClassName(className);
      if (!classNameParts) {
        return;
      }
      applyStyles(element, classNameParts);
    });
  });
};

export const initMeawWind = () => {
  if (typeof document === "undefined") {
    return null;
  }

  initStyles();
  return initMutationObserver();
};

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMeawWind, {
      once: true,
    });
  } else {
    initMeawWind();
  }
}