import { create } from "zustand";

interface VersionNotes {
  [version: string]: string;
}

interface NoteState {
  noteContent: string;
  setNoteContent: (content: string) => void;
  saveNote: (version: string, content: string) => void;
  loadNote: (version: string, defaultNotes: VersionNotes) => void;
}

const useNoteStore = create<NoteState>((set) => ({
  noteContent: "",
  setNoteContent: (content) => set({ noteContent: content }),
  saveNote: (content) => {
    set({ noteContent: content });
  },
  loadNote: (version, defaultNotes) => {
    set({ noteContent: defaultNotes[version] || "" });
  },
}));

export default useNoteStore;
