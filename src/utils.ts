export const KEY_CONSTANT = 'abcdefghijklmnopqrstuvwxyz123456789'
export const CURRENT_TIME = new Date().getTime()

export const generateKey = (keySize: number): string => {
  let key: string = ""
  while (keySize > 0) {
      key += KEY_CONSTANT[parseInt((Math.random() * KEY_CONSTANT.length).toString())]
      keySize--
  }

  return `${key}${CURRENT_TIME}`
}
