import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import api from "../lib/api";
import { addAuthorizationHeaders } from "../lib/api/interceptors/requests";
import { noteRepository } from "../modules/notes/note.repository";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Mock① localStorageをMockする
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// vi.mock はファイル全体に効く「モジュールごとすり替え」
// localStorageはブラウザのAPIなのでvitest環境では直接使えない
// → vi.stubGlobal でグローバルオブジェクトを偽物にする
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})(); // (関数)() = 即時実行関数（IIFE）IIFEで囲むと store は外から見えない（カプセル化）

describe("addAuthorizationHeaders", () => {
  beforeEach(() => {
    // 各テスト前にlocalStorageを偽物にすり替える
    vi.stubGlobal("localStorage", localStorageMock);
  });

  afterEach(() => {
    // 各テスト後にリセット（テスト巻の汚染を防ぐ）
    localStorageMock.clear();
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  it("tokenがある場合はAuthorizationヘッダーを付与する", () => {
    // Arrange (準備)
    localStorageMock.setItem("token", "test-token-123");
    const config = { headers: { Authorization: "" } } as any;
    // Act (実行)
    const result = addAuthorizationHeaders(config);
    // Assert (検証)
    expect(result.headers.Authorization).toBe("Bearer test-token-123");
  });

  it("tokenがない場合はconfigをそのまま返す", () => {
    const config = { headers: {} } as any;
    const result = addAuthorizationHeaders(config);
    expect(result.headers.Authorization).toBeUndefined();
  });

  // ━━ Spyの練習 ━━
  it("localStorageのgetItemが呼ばれたことをSpyで確認する", () => {
    const spy = vi.spyOn(localStorageMock, "getItem");
    const config = { headers: {} } as any;

    addAuthorizationHeaders(config);

    // getItemが1回・”token”というキーで呼ばれたか検証
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("token");
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Mock② axiosをMockしてnoteRepositoryをテスト
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// モジュールごとすり替え
// "../../lib/api" が返すものを偽物にする
vi.mock("../lib/api", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));
// Mockしたapiをimport (vi.mockのあとに書く)

describe("noteRepository", () => {
  afterEach(() => {
    // 各テスト後にMockの呼び出し記録をリセット
    vi.clearAllMocks();
  });

  it("find: Noteの配列を返す", async () => {
    // api.getが返す偽データを設定
    vi.mocked(api.get).mockResolvedValue({
      data: {
        notes: [
          {
            id: 1,
            userId: "user-1",
            title: "テストノート",
            content: null,
            parentId: null,
            createdAt: new Date("2024-01-15"),
          },
        ],
      },
    });

    const result = await noteRepository.find();

    // Noteクラスのインスタンスが帰ってくるか
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("テストノート");
    // api.getが正しいURLで呼ばれたか
    expect(api.get).toHaveBeenCalledWith("/notes", expect.any(Object));
  });

  it("create: 新しいNoteを返す", async () => {
    vi.mocked(api.post).mockResolvedValue({
      data: {
        id: 2,
        userId: "user-1",
        title: "新しいノート",
        content: null,
        parentId: null,
        createdAt: new Date("2024-01-15"),
      },
    });
    const result = await noteRepository.create({ title: "新しいノート" });

    expect(result.title).toBe("新しいノート");
    expect(api.post).toHaveBeenCalledWith("/notes", {
      title: "新しいノート",
      parentId: undefined,
    });
  });

  it("delete: trueを返す", async () => {
    vi.mocked(api.delete).mockResolvedValue({});

    const result = await noteRepository.delete(1);

    expect(result).toBe(true);
    expect(api.delete).toHaveBeenCalledWith("/notes/1");
  });
});
