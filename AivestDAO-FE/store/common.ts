import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { createTrackedSelector } from "react-tracked";
import { getCacheUserInfo, setCacheUserInfo } from "../helper/cache";

type IStore = ReturnType<typeof getStore>;
const userInfoCache = getCacheUserInfo();

function getStore(set, get) {
  return {
    isLogin: !!userInfoCache?.id || false,
    setLogin: (isLogin?: any) =>
      set(() => {
        return { isLogin };
      }),
    userInfo: userInfoCache || ({} as any),
    setUserInfo: (user?: any) =>
      set(() => {
        setCacheUserInfo(user);
        return { userInfo: user };
      }),
  };
}

const baseCommonStore = create(subscribeWithSelector(getStore));

const useCommonStore = createTrackedSelector(baseCommonStore);
// TODO: 必须要这样调用：baseCommonStore.getState()
export { useCommonStore, baseCommonStore };
