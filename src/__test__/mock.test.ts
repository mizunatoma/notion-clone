import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { addAuthorizationHeaders } from "../lib/api/interceptors/requests";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Mock① localStorageをMockする
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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
