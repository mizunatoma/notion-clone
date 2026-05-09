import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAtomValue } from "jotai";

import SearchModal from "./components/SearchModal";
import SideBar from "./components/SideBar";
import { currentUserAtom } from "./modules/auth/current-user.state";
import { noteRepository } from "./modules/notes/note.repository";
import { useNoteStore } from "./modules/notes/note.state";
import "./styles/layout.css";

export default function Layout() {
  const currentUser = useAtomValue(currentUserAtom);
  const [isLoading, setIsLoading] = useState(false);
  const noteStore = useNoteStore();

  const fetchNotes = async () => {
    setIsLoading(true);
    const notes = await noteRepository.find();
    noteStore.set(notes);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (!currentUser) return <Navigate to="/signin" replace />;

  return (
    <div className="layout-container">
      {!isLoading && <SideBar />}
      <main className="layout-main">
        <Outlet />
      </main>
      <SearchModal />
    </div>
  );
}
