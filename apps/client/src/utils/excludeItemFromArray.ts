/* eslint-disable @typescript-eslint/no-explicit-any */
export function excludeItemFromArray(objArray: any[], itemsToExclude: any[]) {
  return objArray.map((obj) => {
    const newObj = { ...obj };
    itemsToExclude.forEach((item) => {
      delete newObj[item];
    });
    return newObj;
  });
}
