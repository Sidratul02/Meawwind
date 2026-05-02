const classNameCache = new Map();

export const splitClassName = (className) => {
  if (classNameCache.has(className)) {
    return classNameCache.get(className);
  }

  const parts = className.split("-");
  const parsed = parts[0] === "chai" ? parts : undefined;
  classNameCache.set(className, parsed);
  return parsed;
};