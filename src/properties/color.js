import colorsPalette from "../constants/colors.js";

const applyBgColor = (element, splittedClassName) => {
  let color = "";
  if (splittedClassName.length === 3) {
    color = splittedClassName[2].replace(/[\[\]]/g, "");
  } else {
    color = colorsPalette[splittedClassName[2]][splittedClassName[3]];
  }
  element.style.backgroundColor = color;
};

const applyTextColor = (element, splittedClassName) => {
  let color = "";
  if (splittedClassName.length === 4) {
    color = colorsPalette[splittedClassName[2]][splittedClassName[3]];
  } else {
    color = splittedClassName[2].replace(/[\[\]]/g, "");
  }
  element.style.color = color;
};

export { applyBgColor, applyTextColor };