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

  const fetchChildren = async (e: Rreact.MouseEvent, note: Note) => {
    e.preventDefault();
    const children = await noteRepository.find({ parentId: note.id });
    if (children == null) return;
    console.log(children);
    noteStore.set(children);
  };

  return (
    <>
      <div>
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onCreate={(e) => createChild(e, note.id)}
            onExpand={(e) => fetchChildren(e, note)}
          />
        ))}
      </div>
    </>
  );
}
