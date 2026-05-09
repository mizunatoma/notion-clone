import { useNoteStore } from '../../modules/notes/note.state';
import NoteItem from './NoteItem';

export default function NoteList() {
  const noteStore = useNoteStore()
  const notes = noteStore.getAll()

  return (
    <>
      <div>
        {notes.map((note) => (
          <NoteItem key={note.id} note={note}/>
        ))}
      </div>
    </>
  );
}
