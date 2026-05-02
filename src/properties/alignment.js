import { alignmentMappingValues } from "../constants/alignment.js";

const determineProperty = (key) => {
  if (key.startsWith("text-")) {
    return "textAlign";
  }

  if (key === "flex" || key === "inline-flex") {
    return "display";
  }

  if (key.startsWith("flex-")) {
    return "flexDirection";
  }

  if (key.startsWith("items-")) {
    return "alignItems";
  }

  if (key.startsWith("justify-")) {
    return "justifyContent";
  }

  return null;
};

const resolveAlignmentKey = (splittedClassName) =>
  splittedClassName.slice(1).join("-");

export const applyAlignment = (element, splittedClassName) => {
  if (splittedClassName.length < 2) {
    return false;
  }

  const key = resolveAlignmentKey(splittedClassName);
  const value = alignmentMappingValues[key];
  if (!value) {
    return false;
  }

  const property = determineProperty(key);
  if (!property) {
    return false;
  }

  element.style[property] = value;
  return true;
};