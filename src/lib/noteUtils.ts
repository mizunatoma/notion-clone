import type { Note } from "../modules/notes/note.entity";

// タイトルを表示用に生計する（null/undefinedなら"無題"）
export function getDisplayTitle(note: Pick<Note, "title">): string {
  return note.title ?? "無題";
}

// 日付を日本語表示用にフォーマットする
export function formatCreatedAt(date: Date): string {
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// キーワードでノートを検索する
export function filterNoteByKeyWord(notes: Note[], keyword: string): Note[] {
  if (!keyword.trim()) return notes;
  return notes.filter((note) =>
    (note.title ?? "無題").toLowerCase().includes(keyword.toLowerCase()),
  );
}
