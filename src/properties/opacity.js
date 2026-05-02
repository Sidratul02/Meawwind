import { opacityMapping } from "../constants/opacity.js";

export const applyOpacity = (element, splittedClassName) => {
  const opacityValue = splittedClassName[2];
  if (!opacityValue) {
    return;
  }

  if (opacityMapping[opacityValue]) {
    element.style.opacity = opacityMapping[opacityValue];
  } else if (opacityValue.startsWith("[") && opacityValue.endsWith("]")) {
    const arbitraryValue = opacityValue.slice(1, -1).replaceAll("_", " ");
    element.style.opacity = arbitraryValue;
  }
};