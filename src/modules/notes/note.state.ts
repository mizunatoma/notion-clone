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

  return { getAll, getOne, set };
};

// 使用時
// const store = useNoteStore();
// store.getAll();
