"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalStorage = void 0;
var storage_1 = require("../helpers/storage");
exports.useLocalStorage = function () {
    return [storage_1.localStorage.setItem, storage_1.localStorage.getItem];
};
