import { displayMapping } from "../constants/display.js";

export const applyDisplay = (element, splittedClassName) => {
  const displayValue = splittedClassName[1];
  if (displayMapping[displayValue]) {
    element.style.display = displayMapping[displayValue];
  } else if (splittedClassName[1] === "display" && splittedClassName.length > 2) {
     const value = splittedClassName[2];
     if (value.startsWith("[") && value.endsWith("]")) {
        element.style.display = value.slice(1, -1).replaceAll("_", " ");
     }
  }
};