import cacheUtils from 'store';

export const cacheUserInfo = 'cacheUserInfo';

export function getCacheUserInfo() {
  return cacheUtils.get(cacheUserInfo);
}

export function setCacheUserInfo(value) {
  return cacheUtils.set(cacheUserInfo, value);
}