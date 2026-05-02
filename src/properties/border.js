import {
  borderDirectionValues,
  borderRadiusValues,
  borderWidthValues,
  roundedDirectionValues,
  borderStyleValues,
  borderStyleDirectionValues,
} from "../constants/border.js";
import colorsPalette from "../constants/colors.js";

const setBorderWidth = (element, property, widthValue) => {
  element.style[property] = widthValue;
  const styleProperty = property.replace(/Width$/, "Style");
  if (styleProperty !== property) {
    element.style[styleProperty] = "solid";
  }
};

const applyProperties = (element, propertyOrProperties, value, setter) => {
  if (Array.isArray(propertyOrProperties)) {
    propertyOrProperties.forEach((property) => setter(element, property, value));
  } else {
    setter(element, propertyOrProperties, value);
  }
};

export const applyBorder = (element, splittedClassName, styleType) => {
  if (!styleType || splittedClassName.length < 3) {
    return;
  }

  const directionProperty = borderDirectionValues[styleType];
  const borderValueKey = splittedClassName[splittedClassName.length - 1];
  const borderWidthValue = borderWidthValues[borderValueKey];

  if (!directionProperty || !borderWidthValue) {
    return;
  }

  applyProperties(element, directionProperty, borderWidthValue, setBorderWidth);
};

const applyRadius = (element, property, value) => {
  element.style[property] = value;
};

export const applyBorderRadius = (element, splittedClassName, styleType) => {
  if (!styleType || splittedClassName.length < 3) {
    return;
  }

  const radiusProperty = roundedDirectionValues[styleType];
  const radiusValueKey = splittedClassName[splittedClassName.length - 1];
  const borderRadiusValue = borderRadiusValues[radiusValueKey];

  if (!radiusProperty || !borderRadiusValue) {
    return;
  }

  applyProperties(element, radiusProperty, borderRadiusValue, applyRadius);
};

const resolveColor = (splittedClassName, baseIndex = 2) => {
  if (splittedClassName.length === 4) {
    const palette = colorsPalette[splittedClassName[baseIndex]];
    const shade = splittedClassName[baseIndex + 1];
    return palette?.[shade];
  }

  return splittedClassName[baseIndex]?.replace(/\[|\]/g, "");
};

export const applyBorderColor = (element, splittedClassName) => {
  if (splittedClassName.length < 3) {
    return;
  }

  const colorValue = resolveColor(splittedClassName);
  if (!colorValue) {
    return;
  }

  element.style.borderColor = colorValue;
};

export const applyBorderStyle = (element, splittedClassName) => {
  if (splittedClassName.length < 3) {
    return;
  }

  const styleKey = splittedClassName[1];
  const styleValue = splittedClassName[2];
  const directionProperty = borderStyleDirectionValues[styleKey];
  const borderStyleValue = borderStyleValues[styleValue];

  if (!directionProperty || !borderStyleValue) {
    return;
  }

  if (Array.isArray(directionProperty)) {
    directionProperty.forEach((property) => {
      element.style[property] = borderStyleValue;
    });
  } else {
    element.style[directionProperty] = borderStyleValue;
  }
};