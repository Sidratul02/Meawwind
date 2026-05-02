import applyStyles from "./apply.js";
import { splitClassName } from "./parser.js";

const GROUP_PROPERTIES = {
  bg: ["backgroundColor"],
  "text-color": ["color"],
  "text-align": ["textAlign"],
  font: ["fontSize", "fontWeight"],
  gap: ["gap", "columnGap", "rowGap"],
  padding: [
    "padding",
    "paddingTop",
    "paddingRight",
    "paddingBottom",
    "paddingLeft",
  ],
  margin: ["margin", "marginTop", "marginRight", "marginBottom", "marginLeft"],
  "border-width": [
    "borderWidth",
    "borderTopWidth",
    "borderRightWidth",
    "borderBottomWidth",
    "borderLeftWidth",
    "borderStyle",
    "borderTopStyle",
    "borderRightStyle",
    "borderBottomStyle",
    "borderLeftStyle",
  ],
  "border-color": ["borderColor"],
  radius: [
    "borderRadius",
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderBottomRightRadius",
    "borderBottomLeftRadius",
  ],
  "flex-align": ["display", "flexDirection", "alignItems", "justifyContent"],
  size: ["width", "height"],
  position: ["position"],
  offset: ["top", "right", "bottom", "left"],
};

const getStyleType = (splittedClassName) => {
  if (!splittedClassName || splittedClassName.length < 2) {
    return "";
  }

  const baseStyle = splittedClassName[1];
  if (baseStyle === "rounded" && splittedClassName.length > 3) {
    return `rounded-${splittedClassName[2]}`;
  }

  if (baseStyle === "gap" && splittedClassName.length > 3) {
    return `gap-${splittedClassName[2]}`;
  }

  return baseStyle;
};

const getGroupId = (splittedClassName) => {
  const styleType = getStyleType(splittedClassName);
  switch (styleType) {
    case "bg":
      return "bg";
    case "text": {
      const textType = splittedClassName[2];
      if (["left", "center", "right", "justify"].includes(textType)) {
        return "text-align";
      }
      return "text-color";
    }
    case "font":
      return "font";
    case "gap":
    case "gap-x":
    case "gap-y":
      return "gap";
    case "p":
    case "px":
    case "py":
    case "pt":
    case "pr":
    case "pb":
    case "pl":
      return "padding";
    case "m":
    case "mx":
    case "my":
    case "mt":
    case "mr":
    case "mb":
    case "ml":
      return "margin";
    case "b":
    case "bt":
    case "br":
    case "bb":
    case "bl":
    case "bx":
    case "by":
      return "border-width";
    case "border":
      return "border-color";
    case "rounded":
    case "rounded-t":
    case "rounded-r":
    case "rounded-b":
    case "rounded-l":
    case "rounded-x":
    case "rounded-y":
      return "radius";
    case "flex":
    case "inline":
    case "items":
    case "justify":
      return "flex-align";
    case "w":
    case "h":
      return "size";
    case "static":
    case "fixed":
    case "absolute":
    case "relative":
    case "sticky":
      return "position";
    case "top":
    case "right":
    case "bottom":
    case "left":
      return "offset";
    default:
      return null;
  }
};

const applyClassToElement = (element, className) => {
  if (!className || !className.startsWith("chai-")) {
    return;
  }

  const classNameParts = splitClassName(className);
  if (!classNameParts) {
    return;
  }

  applyStyles(element, classNameParts);
};

const clearGroupStyles = (element, groupId) => {
  const properties = GROUP_PROPERTIES[groupId] || [];
  properties.forEach((property) => {
    element.style[property] = "";
  });
};

const recomputeGroupForElement = (element, groupId) => {
  if (!groupId) {
    return;
  }

  clearGroupStyles(element, groupId);
  element.classList.forEach((className) => {
    if (!className.startsWith("chai-")) {
      return;
    }

    const classNameParts = splitClassName(className);
    if (!classNameParts || getGroupId(classNameParts) !== groupId) {
      return;
    }

    applyStyles(element, classNameParts);
  });
};

export const applyChaiClasses = (element) => {
  if (!element || !element.classList) {
    return;
  }

  element.classList.forEach((className) => {
    applyClassToElement(element, className);
  });
};

const applyToElementAndChildren = (element) => {
  if (!(element instanceof Element)) {
    return;
  }

  applyChaiClasses(element);
  element
    .querySelectorAll('[class*="chai-"]')
    .forEach((child) => applyChaiClasses(child));
};

const parseClassString = (classString) =>
  new Set((classString || "").split(/\s+/).filter(Boolean));

const getAddedChaiClasses = (oldClassString, newClassString) => {
  const oldClasses = parseClassString(oldClassString);
  const newClasses = parseClassString(newClassString);

  const added = [];
  newClasses.forEach((className) => {
    if (!oldClasses.has(className) && className.startsWith("chai-")) {
      added.push(className);
    }
  });

  return added;
};

const getRemovedChaiClasses = (oldClassString, newClassString) => {
  const oldClasses = parseClassString(oldClassString);
  const newClasses = parseClassString(newClassString);

  const removed = [];
  oldClasses.forEach((className) => {
    if (!newClasses.has(className) && className.startsWith("chai-")) {
      removed.push(className);
    }
  });

  return removed;
};

export const initMutationObserver = () => {
  const pendingTargets = new Map();
  let rafId = null;

  const enqueueTarget = (
    element,
    { classNames = null, recomputeGroups = null, full = false } = {},
  ) => {
    if (!(element instanceof Element)) {
      return;
    }

    const existing = pendingTargets.get(element) || {
      classNames: new Set(),
      recomputeGroups: new Set(),
      full: false,
    };

    if (full) {
      existing.full = true;
      existing.classNames.clear();
      existing.recomputeGroups.clear();
      pendingTargets.set(element, existing);
      return;
    }

    if (!existing.full) {
      (classNames || []).forEach((className) =>
        existing.classNames.add(className),
      );
      (recomputeGroups || []).forEach((groupId) =>
        existing.recomputeGroups.add(groupId),
      );
    }

    pendingTargets.set(element, existing);
  };

  const flushPendingTargets = () => {
    pendingTargets.forEach((state, element) => {
      if (state.full) {
        applyToElementAndChildren(element);
        return;
      }

      state.recomputeGroups.forEach((groupId) => {
        recomputeGroupForElement(element, groupId);
      });

      state.classNames.forEach((className) => {
        const classNameParts = splitClassName(className);
        const groupId = classNameParts ? getGroupId(classNameParts) : null;
        if (groupId && state.recomputeGroups.has(groupId)) {
          return;
        }

        applyClassToElement(element, className);
      });
    });

    pendingTargets.clear();
    rafId = null;
  };

  const scheduleFlush = () => {
    if (rafId !== null) {
      return;
    }

    rafId = window.requestAnimationFrame(flushPendingTargets);
  };

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes") {
        const addedClasses = getAddedChaiClasses(
          mutation.oldValue,
          mutation.target.className,
        );
        const removedClasses = getRemovedChaiClasses(
          mutation.oldValue,
          mutation.target.className,
        );
        const groupsToRecompute = new Set();

        removedClasses.forEach((className) => {
          const classNameParts = splitClassName(className);
          const groupId = classNameParts ? getGroupId(classNameParts) : null;
          if (groupId) {
            groupsToRecompute.add(groupId);
          }
        });

        if (addedClasses.length > 0 || groupsToRecompute.size > 0) {
          enqueueTarget(mutation.target, {
            classNames: addedClasses,
            recomputeGroups: groupsToRecompute,
          });
        }
        return;
      }

      mutation.addedNodes.forEach((node) => {
        enqueueTarget(node, { full: true });
      });
    });

    scheduleFlush();
  });

  observer.observe(document.body, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ["class"],
    attributeOldValue: true,
  });

  return observer;
};