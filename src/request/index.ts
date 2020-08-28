import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  AxiosError,
} from 'axios';
/**
 * @description 网络请求方法
 * @param {} refreshPath 如果设置了值，则代表token过期得时候需要刷新token
 */
class Request {
  isRefreshToken: boolean;
  cache: any[];
  options: {
    refreshPath?: string;
    refreshTokenCode: number[];
    resolveResultFc?: (data: AxiosResponse, error: AxiosError) => Promise<any>;
  };
  axios: AxiosInstance;

  constructor(
    config?: {
      refreshPath?: string;
      refreshTokenCode?: number[];
      resolveResultFc?: (
        data: AxiosResponse,
        error: AxiosError
      ) => Promise<any>;
    },
    axiosOptions?: AxiosRequestConfig
  ) {
    this.isRefreshToken = false;
    this.cache = [];
    this.options = Object.assign(
      {},
      {
        refreshPath: undefined,
        refreshTokenCode: [],
        resolveResultFc: () => {},
      },
      config
    );
    this.axios = axios.create(axiosOptions);
    this.axios.interceptors.request.use(
      (config) => {
        if (this.isRefreshToken) {
          this.cache.push(config);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.axios.interceptors.response.use(
      (response) => {
        if (
          this.options.refreshPath &&
          this.options.refreshTokenCode.includes(response.data.code)
        ) {
          this.refrshToken();
        }
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
  private refrshToken() {
    if (!this.isRefreshToken) {
      this.isRefreshToken = true;
      this.sendRequest({
        url: this.options.refreshPath,
      }).finally(() => {
        this.isRefreshToken = false;
      });
    }
  }
  sendRequest(options: AxiosRequestConfig) {
    if (options.data) {
      return this.upload(options.url as string, options.data);
    } else {
      return new Promise((resolve, reject) => {
        this.axios({
          ...options,
        })
          .then(({ data }) => {})
          .catch((error) => {
            reject(error);
          });
      });
    }
  }
  /**
   * @description 改变上传文件得传输方法
   * @param path
   * @param file
   */
  private upload(path: string, file: FormData) {
    return this.axios.put(path, file);
  }
}

export default Request;
