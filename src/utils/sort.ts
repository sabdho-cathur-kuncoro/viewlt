export function sortbyName(a: any, b: any) {
  const nameA = a?.product_name;
  const nameB = b?.product_name;
  // console.log(a1);
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
}
