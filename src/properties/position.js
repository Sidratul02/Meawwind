import {
  offsetDirectionValues,
  offsetValues,
  positionValues,
} from "../constants/position.js";

const resolveOffsetValue = (key) => {
  if (key === "0") {
    return "0px";
  }

  if (offsetValues[key]) {
    return offsetValues[key];
  }

  const numericValue = Number(key);
  if (Number.isFinite(numericValue)) {
    return `${numericValue * 4}px`;
  }

  return undefined;
};

export const applyPositionType = (element, styleType) => {
  const positionValue = positionValues[styleType];
  if (!positionValue) {
    return;
  }

  element.style.position = positionValue;
};

export const applyOffset = (element, splittedClassName, styleType) => {
  if (!styleType || splittedClassName.length < 3) {
    return;
  }

  const direction = offsetDirectionValues[styleType];
  const offsetKey = splittedClassName[splittedClassName.length - 1];
  const offsetValue = resolveOffsetValue(offsetKey);

  if (!direction || !offsetValue) {
    return;
  }

  element.style[direction] = offsetValue;
};