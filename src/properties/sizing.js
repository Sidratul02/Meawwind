import { heightValues, widthValues } from "../constants/sizing.js";

const resolveDimensionValue = (key, valuesMap) => {
  if (valuesMap[key]) {
    return valuesMap[key];
  }

  const numericValue = Number(key);
  if (Number.isFinite(numericValue)) {
    return `${numericValue * 4}px`;
  }

  return undefined;
};

export const applyWidthHeight = (element, splittedClassName, styleType) => {
  if (!styleType || splittedClassName.length < 3) {
    return;
  }

  const valueKey = splittedClassName[splittedClassName.length - 1];
  if (styleType === "w") {
    const widthValue = resolveDimensionValue(valueKey, widthValues);
    if (!widthValue) {
      return;
    }

    element.style.width = widthValue;
    return;
  }

  if (styleType === "h") {
    const heightValue = resolveDimensionValue(valueKey, heightValues);
    if (!heightValue) {
      return;
    }

    element.style.height = heightValue;
  }
};