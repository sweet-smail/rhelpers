import { AxiosRequestConfig, AxiosResponse, AxiosInstance, AxiosError } from 'axios';
/**
 * @description 网络请求方法
 * @param {} refreshPath 如果设置了值，则代表token过期得时候需要刷新token
 */
declare class Request {
    isRefreshToken: boolean;
    cache: any[];
    options: {
        refreshPath?: string;
        refreshTokenCode: number[];
        resolveResultFc?: (data: AxiosResponse, error: AxiosError) => Promise<any>;
    };
    axios: AxiosInstance;
    constructor(config?: {
        refreshPath?: string;
        refreshTokenCode?: number[];
        resolveResultFc?: (data: AxiosResponse, error: AxiosError) => Promise<any>;
    }, axiosOptions?: AxiosRequestConfig);
    private refrshToken;
    sendRequest(options: AxiosRequestConfig): Promise<unknown>;
    /**
     * @description 改变上传文件得传输方法
     * @param path
     * @param file
     */
    private upload;
}
export default Request;
