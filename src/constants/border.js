export const borderDirectionValues = {
  b: "borderWidth",
  bt: "borderTopWidth",
  br: "borderRightWidth",
  bb: "borderBottomWidth",
  bl: "borderLeftWidth",
  bx: ["borderLeftWidth", "borderRightWidth"],
  by: ["borderTopWidth", "borderBottomWidth"],
};

export const borderWidthValues = {
  none: "0",
  0: "0",
  1: "1px",
  2: "2px",
  4: "4px",
  8: "8px",
  sm: "1px",
  md: "2px",
  lg: "4px",
  xl: "8px",
};

export const roundedDirectionValues = {
  rounded: "borderRadius",
  "rounded-t": ["borderTopLeftRadius", "borderTopRightRadius"],
  "rounded-r": ["borderTopRightRadius", "borderBottomRightRadius"],
  "rounded-b": ["borderBottomRightRadius", "borderBottomLeftRadius"],
  "rounded-l": ["borderTopLeftRadius", "borderBottomLeftRadius"],
  "rounded-x": ["borderTopLeftRadius", "borderBottomRightRadius"],
  "rounded-y": ["borderTopRightRadius", "borderBottomLeftRadius"],
};

export const borderRadiusValues = {
  none: "0",
  sm: "0.125rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px",
};

export const borderStyleValues = {
  solid: "solid",
  dashed: "dashed",
  dotted: "dotted",
  double: "double",
  groove: "groove",
  ridge: "ridge",
  inset: "inset",
  outset: "outset",
  none: "none",
};

export const borderStyleDirectionValues = {
  "border-style": "borderStyle",
  "border-t-style": "borderTopStyle",
  "border-r-style": "borderRightStyle",
  "border-b-style": "borderBottomStyle",
  "border-l-style": "borderLeftStyle",
  "border-x-style": ["borderLeftStyle", "borderRightStyle"],
  "border-y-style": ["borderTopStyle", "borderBottomStyle"],
};