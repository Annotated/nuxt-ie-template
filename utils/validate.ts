/**
 * @param {string} number
 * @returns {Boolean}
 */
export function validMobile(num: string) {
  const reg =
    /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/
  return reg.test(num)
}
