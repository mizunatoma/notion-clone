import type { Note } from "../../modules/notes/note.entity";
import { noteRepository } from "../../modules/notes/note.repository";
import { useNoteStore } from "../../modules/notes/note.state";
import NoteItem from "./NoteItem";

interface Props {
  layer?: number;
  parentId?: number;
}

export default function NoteList({ layer = 0, parentId }) {
  const noteStore = useNoteStore();
  const notes = noteStore.getAll();

  const createChild = async (e: React.MouseEvent, parentId: number) => {
    e.preventDefault();
    const newNote = await noteRepository.create({ parentId });
    console.log(newNote);
    noteStore.set([newNote]);
  };

  const fetchChildren = async (e: React.MouseEvent, note: Note) => {
    e.preventDefault();
    const children = await noteRepository.find({ parentId: note.id });
    if (children == null) return;
    console.log(children);
    noteStore.set(children);
  };

  return (
    <>
      <div>
        {notes
          .filter((note) => note.parentId == parentId)
          .map((note) => (
            <div key={note.id}>
              <NoteItem
                note={note}
                onCreate={(e) => createChild(e, note.id)}
                onExpand={(e) => fetchChildren(e, note)}
                layer={layer}
              />
              <NoteList layer={layer + 1} parentId={note.id} />
            </div>
          ))}
      </div>
    </>
  );
}
