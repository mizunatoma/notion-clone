import { atom } from "jotai";

import type { User } from "../users/user.entity";

export const currentUserAtom = atom<User>();

// 使い方 グローバルステートjotai
// const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
// const currentUser = useAtomValue(currentUserAtom);  値だけ取り出す場合
// const setCurrentUser = useSetAtom(currentUserAtom); 更新関数だけ取り出す場合
