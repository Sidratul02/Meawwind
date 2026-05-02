import { cursorMapping } from "../constants/cursor.js";

export const applyCursor = (element, splittedClassName) => {
  const cursorValue = splittedClassName[2];
  if (!cursorValue) {
    return;
  }

  if (cursorMapping[cursorValue]) {
    element.style.cursor = cursorMapping[cursorValue];
  } else if (cursorValue.startsWith("[") && cursorValue.endsWith("]")) {
    const arbitraryValue = cursorValue.slice(1, -1).replaceAll("_", " ");
    element.style.cursor = arbitraryValue;
  } else {
    console.warn(`This cursor value is not supported yet: ${cursorValue}`);
  }
};