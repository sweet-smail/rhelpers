/**
 * @deprecated 使用localstorage
 */
class LocalStorage {
  /**
   * @deprecated 设置存储数据，注意再设置的时候不会判断是否当前已经存在值
   * @param key  name
   * @param value value
   * @param expire 过期时间(时间戳，毫秒) 如果不设置或者设置为0代表为过期时间
   */
  setItem(key: string, value: any, expire?: number) {
    let data: { origin: any; expireTime?: number } = {
      origin: value,
    };
    if (!expire) {
      data.expireTime = expire;
    }
    localStorage.setItem(key, JSON.stringify(data));
  }
  /**
   *
   * @param key 需要获取的参数
   * @deprecated 获取localstoage,如果通过setItem设置了过期时间，那么会检测数据是否过期，并报错
   * @returns any
   */
  getItem: (key: string) => any = (key) => {
    const localData = localStorage.getItem(key);
    // 如果不存在，直接返回
    if (!localData) {
      return localData;
    }
    const parseData = JSON.parse(localData);
    //判断数据是否过期
    if (parseData.expireTime && parseData.expireTime <= Date.now()) {
      throw new Error(`local ${key} has expired`);
    }
    return parseData.origin || parseData;
  };
}

export const localStorage = new LocalStorage();
