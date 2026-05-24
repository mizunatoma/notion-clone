import { describe, expect, it } from "vitest";

import {
  filterNoteByKeyWord,
  formatCreatedAt,
  getDisplayTitle,
} from "../lib/noteUtils";
import { Note } from "../modules/notes/note.entity";

// テスト用のNoteデータを作るヘルパー
const makeNote = (overrides: Partial<Note> = {}): Note =>
  new Note({
    id: 1,
    userId: "user-1",
    title: "テストノート",
    content: null,
    parentId: null,
    createdAt: new Date("2024-01-15"),
    ...overrides,
  });

// ━━━━━━━━━━━━━━━━━━━━━━━━
// getDisplayTitle
// ━━━━━━━━━━━━━━━━━━━━━━━━
describe("getDisplayTitle", () => {
  it("titleがある場合はそのまま返す", () => {
    const note = makeNote({ title: "マイノート" });
    expect(getDisplayTitle(note)).toBe("マイノート");
  });

  it("titleがnullの場合は「無題」を返す", () => {
    const note = makeNote({ title: null });
    expect(getDisplayTitle(note)).toBe("無題");
  });

  it("titleがundefinedの場合は「無題」を返す", () => {
    const note = makeNote({ title: undefined });
    expect(getDisplayTitle(note)).toBe("無題");
  });

  it("titleが空文字の場合はそのまま空文字を返す", () => {
    const note = makeNote({ title: "" });
    expect(getDisplayTitle(note)).toBe("");
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━
// formatCreatedAt
// ━━━━━━━━━━━━━━━━━━━━━━━━
describe("formatCreatedAt", () => {
  it("Dateを日本語形式にフォーマットする", () => {
    const date = new Date("2024-01-15");
    expect(formatCreatedAt(date)).toBe("2024年1月15日");
  });

  it("月・日が1桁でも正しくフォーマットする", () => {
    const date = new Date("2024-03-05");
    expect(formatCreatedAt(date)).toBe("2024年3月5日");
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━
// filterNoteByKeyWord
// ━━━━━━━━━━━━━━━━━━━━━━━━
describe("filterNoteByKeyWord", () => {
  const notes = [
    makeNote({ id: 1, title: "React入門" }),
    makeNote({ id: 2, title: "TypeScriptの基礎" }),
    makeNote({ id: 3, title: "無題" }),
    makeNote({ id: 4, title: null }),
  ];

  it("キーワードに一致するノートだけ返す", () => {
    const result = filterNoteByKeyWord(notes, "React");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("大文字小文字を区別しない", () => {
    const result = filterNoteByKeyWord(notes, "react");
    expect(result).toHaveLength(1);
  });

  it("キーワードが空のときは全件返す", () => {
    const result = filterNoteByKeyWord(notes, "");
    expect(result).toHaveLength(4);
  });

  it("スペースだけのキーワードは空扱いで全件返す", () => {
    const result = filterNoteByKeyWord(notes, "   ");
    expect(result).toHaveLength(4);
  });

  it("titleがnullのノートは「無題」として検索できる", () => {
    const result = filterNoteByKeyWord(notes, "無題");
    expect(result).toHaveLength(2); // id:3とid:4
  });
});

//   describe("グループ名", () => { ... })
// //  └── テストをグループにまとめる箱
// //      関連するテストをひとまとめにして読みやすくする

// it("テスト名", () => { ... })
// //  └── テスト1件を定義する
// //      「〜のとき〜になる」という1つの検証

// expect(実際の値).toBe(期待する値)
// //  └── 「これはこうなるはず」と宣言する
// //      一致しなければテスト失敗になる
