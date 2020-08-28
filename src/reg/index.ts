/**
 * 对手机号进行正则匹配
 */
export const regPhone = (phone: string) => {
  return !/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone);
};
/**
 * 对车牌号进行认证
 * plateno 车牌号
 * type 校验规则 ordinary普通车，newEnergy 新能源车,传空代表所有车
 */
export const regPlateNo = (
  plateno: string,
  type?: 'ordinary' | 'newEnergy'
) => {
  switch (type) {
    case 'ordinary':
      const ordinaryPlateNumMatch = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}/;
      return ordinaryPlateNumMatch.test(plateno);
    case 'newEnergy':
      const newEnergyPlateNumMatch = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))/;
      return newEnergyPlateNumMatch.test(plateno);
    default:
      const plateNumMatch = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/;
      return plateNumMatch.test(plateno);
  }
};
/**
 * 对邮箱进项验证
 */
