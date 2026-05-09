import { FiPlus, FiSearch } from "react-icons/fi";

import { noteRepository } from "../../modules/notes/note.repository";
import { useNoteStore } from "../../modules/notes/note.state";
import NoteList from "../NoteList";
import Item from "./Item";
import UserItem from "./UserItem";

export default function SideBar() {
  const noteStore = useNoteStore();

  const createNote = async () => {
    try {
      const newNotes = await noteRepository.create({});
      noteStore.set([newNotes]);
    } catch (error) {
      console.log(error);
      alert("ノートの作成に失敗しました。");
    }
  };

  return (
    <>
      <aside className="sidebar">
        <div>
          <div>
            <UserItem />
            <Item label="検索" icon={FiSearch} onClick={() => {}} />
          </div>
          <div className="sidebar-spacer">
            <NoteList />
            <Item label="ノートを作成" icon={FiPlus} onClick={createNote} />
          </div>
        </div>
      </aside>
      <div className="sidebar-placeholder"></div>
    </>
  );
}
