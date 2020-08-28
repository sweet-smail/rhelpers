/**
 * 对手机号进行正则匹配
 */
export declare const regPhone: (phone: string) => boolean;
/**
 * 对车牌号进行认证
 * plateno 车牌号
 * type 校验规则 ordinary普通车，newEnergy 新能源车,传空代表所有车
 */
export declare const regPlateNo: (plateno: string, type?: "ordinary" | "newEnergy" | undefined) => boolean;
/**
 * 对邮箱进项验证
 */
