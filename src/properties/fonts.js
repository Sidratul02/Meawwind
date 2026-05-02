import { fontSizeValues, fontWeightValues } from "../constants/fonts.js";

export const applyFontSize = (element, splittedClassName) => {
  if (splittedClassName.length !== 3) {
    return;
  }
  if (fontWeightValues[splittedClassName[2]]) {
    element.style.fontWeight = fontWeightValues[splittedClassName[2]];
    return;
  }
  const fontSizeKey = splittedClassName[2];
  const fontSizeValue = fontSizeValues[fontSizeKey];
  if (!fontSizeValue) {
    return;
  }
  element.style.fontSize = fontSizeValue;
};