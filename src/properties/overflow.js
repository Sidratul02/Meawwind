import {
  overflowMapping,
  overflowXMapping,
  overflowYMapping,
} from "../constants/overflow.js";

export const applyOverflow = (element, splittedClassName, styleType) => {
  const overflowValue = splittedClassName[1];

  switch (styleType) {
    case "overflow":
      if (overflowMapping[splittedClassName[2]]) {
        element.style.overflow = overflowMapping[splittedClassName[2]];
      } else if (
        splittedClassName[2] &&
        splittedClassName[2].startsWith("[") &&
        splittedClassName[2].endsWith("]")
      ) {
        element.style.overflow = splittedClassName[2]
          .slice(1, -1)
          .replaceAll("_", " ");
      }
      break;
    case "overflow-x":
      if (overflowXMapping[splittedClassName[2]]) {
        element.style.overflowX = overflowXMapping[splittedClassName[2]];
      } else if (
        splittedClassName[2] &&
        splittedClassName[2].startsWith("[") &&
        splittedClassName[2].endsWith("]")
      ) {
        element.style.overflowX = splittedClassName[2]
          .slice(1, -1)
          .replaceAll("_", " ");
      }
      break;
    case "overflow-y":
      if (overflowYMapping[splittedClassName[2]]) {
        element.style.overflowY = overflowYMapping[splittedClassName[2]];
      } else if (
        splittedClassName[2] &&
        splittedClassName[2].startsWith("[") &&
        splittedClassName[2].endsWith("]")
      ) {
        element.style.overflowY = splittedClassName[2]
          .slice(1, -1)
          .replaceAll("_", " ");
      }
      break;
  }
};