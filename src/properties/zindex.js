import { zIndexMapping } from "../constants/zindex.js";

export const applyZIndex = (element, splittedClassName) => {
  const zValue = splittedClassName[2];
  if (!zValue) {
    return;
  }

  if (zIndexMapping[zValue]) {
    element.style.zIndex = zIndexMapping[zValue];
  } else if (zValue.startsWith("[") && zValue.endsWith("]")) {
    const arbitraryValue = zValue.slice(1, -1).replaceAll("_", " ");
    element.style.zIndex = arbitraryValue;
  }
};