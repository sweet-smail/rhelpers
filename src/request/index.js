"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
/**
 * @description 网络请求方法
 * @param {} refreshPath 如果设置了值，则代表token过期得时候需要刷新token
 */
var Request = /** @class */ (function () {
    function Request(config, axiosOptions) {
        var _this = this;
        this.isRefreshToken = false;
        this.cache = [];
        this.options = Object.assign({}, {
            refreshPath: undefined,
            refreshTokenCode: [],
            resolveResultFc: function () { },
        }, config);
        this.axios = axios_1.default.create(axiosOptions);
        this.axios.interceptors.request.use(function (config) {
            if (_this.isRefreshToken) {
                _this.cache.push(config);
            }
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        this.axios.interceptors.response.use(function (response) {
            if (_this.options.refreshPath &&
                _this.options.refreshTokenCode.includes(response.data.code)) {
                _this.refrshToken();
            }
            return response;
        }, function (error) {
            return Promise.reject(error);
        });
    }
    Request.prototype.refrshToken = function () {
        var _this = this;
        if (!this.isRefreshToken) {
            this.isRefreshToken = true;
            this.sendRequest({
                url: this.options.refreshPath,
            }).finally(function () {
                _this.isRefreshToken = false;
            });
        }
    };
    Request.prototype.sendRequest = function (options) {
        var _this = this;
        if (options.data) {
            return this.upload(options.url, options.data);
        }
        else {
            return new Promise(function (resolve, reject) {
                _this.axios(__assign({}, options))
                    .then(function (_a) {
                    var data = _a.data;
                })
                    .catch(function (error) {
                    reject(error);
                });
            });
        }
    };
    /**
     * @description 改变上传文件得传输方法
     * @param path
     * @param file
     */
    Request.prototype.upload = function (path, file) {
        return this.axios.put(path, file);
    };
    return Request;
}());
exports.default = Request;
