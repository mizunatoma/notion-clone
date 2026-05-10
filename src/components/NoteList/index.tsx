import { noteRepository } from "../../modules/notes/note.repository";
import { useNoteStore } from "../../modules/notes/note.state";
import NoteItem from "./NoteItem";

export default function NoteList() {
  const noteStore = useNoteStore();
  const notes = noteStore.getAll();

  const createChild = async (e: React.MouseEvent, parentId: number) => {
    e.preventDefault();
    const newNote = await noteRepository.create({ parentId });
    console.log(newNote);
    noteStore.set([newNote]);
  };

  return (
    <>
      <div>
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onCreate={(e) => createChild(e, note.id)}
          />
        ))}
      </div>
    </>
  );
}
