function Rad(d: number) {
  return (d * Math.PI) / 180.0; //经纬度转换成三角函数中度分表形式。
}
/**
 * 计算两个经纬度直线距离，保留一位小数
 */
export const computeDistance = (
  latitude1: number,
  longitude1: number,
  latitude2: number,
  longitude2: number
) => {
  const radLat1 = Rad(latitude1);
  const radLat2 = Rad(latitude2);
  const a = radLat1 - radLat2;
  const b = Rad(longitude1) - Rad(longitude2);
  let s: number =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
      )
    );
  s = s * 6378.137;
  s = Math.round(s * 10000) / 10000;
  return s.toFixed(1);
};
