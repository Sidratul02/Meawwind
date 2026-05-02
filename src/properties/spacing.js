import {
  gapDirectionTypes,
  marginDirectionTypes,
  paddingDirectionTypes,
  spacingValues as spacingScale,
} from "../constants/spacing.js";

export const applyPadding = (element, splittedClassName) => {
  let paddingValue = "";
  if (splittedClassName.length !== 3) {
    return;
  }
  const paddingType = splittedClassName[1];
  const paddingDirection = paddingDirectionTypes[paddingType];
  const spacingValue = spacingScale[splittedClassName[2]];
  if (!paddingDirection || !spacingValue) {
    return;
  }
  paddingValue = spacingValue;
  if (Array.isArray(paddingDirection)) {
    paddingDirection.forEach((direction) => {
      element.style[direction] = paddingValue;
    });
  } else {
    element.style[paddingDirection] = paddingValue;
  }
};

export const applyMargin = (element, splittedClassName) => {
  let marginValue = "";
  if (splittedClassName.length !== 3) {
    return;
  }
  const marginType = splittedClassName[1];
  const marginDirection = marginDirectionTypes[marginType];
  const spacingValue = spacingScale[splittedClassName[2]];
  if (!marginDirection || !spacingValue) {
    return;
  }
  marginValue = spacingValue;
  if (Array.isArray(marginDirection)) {
    marginDirection.forEach((direction) => {
      element.style[direction] = marginValue;
    });
  } else {
    element.style[marginDirection] = marginValue;
  }
};

export const applyGap = (element, splittedClassName, styleType) => {
  if (!styleType || splittedClassName.length < 3) {
    return;
  }

  const gapDirection = gapDirectionTypes[styleType];
  const gapValueKey = splittedClassName[splittedClassName.length - 1];
  const numericGap = Number(gapValueKey);
  const gapValue =
    spacingScale[gapValueKey] ||
    (Number.isFinite(numericGap) ? `${numericGap * 4}px` : undefined);

  if (!gapDirection || !gapValue) {
    return;
  }

  element.style[gapDirection] = gapValue;
};