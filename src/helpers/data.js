"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepClone = exports.TypeOfData = void 0;
/**
 * @description 判断数据类型
 * @returns 返回数据类型字符串
 * @param data
 */
exports.TypeOfData = function (data) {
    var dataString = Object.prototype.toString.call(data);
    return dataString.slice(8, dataString.length - 1);
};
/**
 * @description 数据克隆
 * @param obj
 */
exports.deepClone = function (data) {
    var parents = []; //保存已经遍历的key
    var children = []; // 保存已经遍历的数据
    var _deepClone = function (parent) {
        if (parent === null)
            return parent;
        if (typeof parent !== 'object')
            return parent;
        //如果在遍历的keys中已经存在了，则代表已经遍历过了
        var index = parents.indexOf(parent);
        if (index !== -1) {
            return children[parent];
        }
        var child, proto;
        switch (exports.TypeOfData(parent)) {
            case 'Array':
                child = [];
                break;
            case 'Date':
                child = new Date(parent.getTime());
                break;
            default:
                proto = Object.getPrototypeOf(parent);
                child = Object.create(proto);
        }
        parents.push(parent);
        children.push(child);
        for (var i in parent) {
            // 递归
            child[i] = _deepClone(parent[i]);
        }
        return child;
    };
    return _deepClone(data);
};
