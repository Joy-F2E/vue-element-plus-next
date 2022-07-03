export const transToKeyBase = (key: string) => {
  // return key.replace(/(A-Z)g/, `-$1`).toLocaleLowerCase()
  return key.replace(/([a-z])([A-Z])/, "$1-$2").toLocaleLowerCase()
}