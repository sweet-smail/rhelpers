/**
 * @description 判断数据类型
 * @returns 返回数据类型字符串
 * @param data
 */
export const TypeOfData = (data: any) => {
  const dataString = Object.prototype.toString.call(data);
  return dataString.slice(8, dataString.length - 1);
};

/**
 * @description 数据克隆
 * @param obj
 */
export const deepClone = (data: any) => {
  const parents: any[] = []; //保存已经遍历的key
  const children: any[] = []; // 保存已经遍历的数据

  const _deepClone = (parent: any) => {
    if (parent === null) return parent;
    if (typeof parent !== 'object') return parent;

    //如果在遍历的keys中已经存在了，则代表已经遍历过了
    const index = parents.indexOf(parent);
    if (index !== -1) {
      return children[parent];
    }

    let child, proto;
    switch (TypeOfData(parent)) {
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

    for (let i in parent) {
      // 递归
      child[i] = _deepClone(parent[i]);
    }
    return child;
  };
  return _deepClone(data);
};
