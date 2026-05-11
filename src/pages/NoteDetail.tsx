import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import TitleInput from "../components/TitleInput";
import { noteRepository } from "../modules/notes/note.repository";
import { useNoteStore } from "../modules/notes/note.state";
import "../styles/pages/note-detail.css";

export default function NoteDetail() {
  const params = useParams();
  const id = parseInt(params.id!);
  const [isLoading, setIsLoading] = useState(false);
  const noteStore = useNoteStore();
  const note = noteStore.getOne(id);

  const fetchOne = async () => {
    setIsLoading(true);
    const note = await noteRepository.findOne(id);
    noteStore.set([note]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOne();
  }, [id]);

  if (isLoading) return <div />;
  if (!note) return <div>note is not existed</div>;

  return (
    <div className="note-detail-container">
      <div className="note-detail-content">
        <TitleInput initialData={note} />
      </div>
    </div>
  );
}
