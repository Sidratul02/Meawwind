import { shadowMapping } from "../constants/shadow.js";

export const applyShadow = (element, splittedClassName) => {
  const shadowValue = splittedClassName[2];
  if (!shadowValue) {
    element.style.boxShadow = shadowMapping.base;
    return;
  }

  if (shadowMapping[shadowValue]) {
    element.style.boxShadow = shadowMapping[shadowValue];
  } else if (shadowValue.startsWith("[") && shadowValue.endsWith("]")) {
    const arbitraryValue = shadowValue.slice(1, -1).replaceAll("_", " ");
    element.style.boxShadow = arbitraryValue;
  } else {
    console.warn(`This shadow value is not supported yet: ${shadowValue}`);
  }
};