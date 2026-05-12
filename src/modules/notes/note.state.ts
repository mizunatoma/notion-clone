import { atom, useAtom } from "jotai";

import type { Note } from "./note.entity";

const notesAtom = atom<Note[]>([]);

export const useNoteStore = () => {
  const [notes, setNotes] = useAtom(notesAtom);

  const getAll = () => notes;
  const getOne = (id: number) => notes.find((note) => note.id === id);
  const set = (newNotes: Note[]) => {
    setNotes((oldNotes) => {
      const combineNotes = [...oldNotes, ...newNotes];
      const uniqueNotes: { [key: number]: Note } = {};
      for (const note of combineNotes) {
        uniqueNotes[note.id] = note;
      }
      return Object.values(uniqueNotes);
    });
  };

  const deleteNote = (id: number) => {
    const findChildrenIds = (parentId: number): number[] => {
      const childrenIds = notes
        .filter((note) => note.parentId == parentId)
        .map((child) => child.id);
      return childrenIds.concat(
        // 再起処理
        ...childrenIds.map((childId) => findChildrenIds(childId)),
      );
    };

    const childrenIds = findChildrenIds(id);
    setNotes(
      (oldNotes) =>
        oldNotes.filter((note) => ![...childrenIds, id].includes(note.id)),
      // 親を含む、再起的な子孫Note 以外！をフィルター
    );
  };

  const clear = () => setNotes([]);

  return { getAll, getOne, set, delete: deleteNote, clear };
};

// 使用時
// const store = useNoteStore();
// store.getAll();
