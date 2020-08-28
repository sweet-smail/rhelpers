"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMoney = void 0;
/**
 * 金额转换（金额分转换为元）
 * 如 2000 转换为20;2001 转为为20.01：201转换为20.1
 */
exports.formatMoney = function (num) {
    if (num === 0) {
        return '0';
    }
    return parseFloat((num / 100).toFixed(2));
};
