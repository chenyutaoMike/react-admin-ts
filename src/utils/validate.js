
export function extractCode(code) {
  let reg = /：([a-zA-Z0-9]+)/;
  return reg.exec(code)[1];
}