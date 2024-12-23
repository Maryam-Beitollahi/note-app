import { useReducer, useState } from "react";
import "./App.css";
import AddNewNote from "./components/AddNewNote";
import NoteList from "./components/NoteList";
import NoteStatus from "./components/NoteStatus";
import NoteHeader from "./components/NoteHeader";
function App() {
  //const [notes, setNotes] = useState([]);
  const [notes, dispatch] = useReducer(notesReducer, []);
  const [sortBy, setSortBy] = useState("latest");

  function notesReducer(notes, action) {
    switch (action.type) {
      case "addNote": {
        return [...notes, action.payload];
      }
      case "deleteNote": {
        return notes.filter((s) => s.id !== action.payload);
      }
      case "completeNote": {
        return notes.map((note) =>
          note.id === action.payload
            ? { ...note, completed: !note.completed }
            : note
        );
      }
      default:
        throw new Error("unknown error" + action.type);
    }
  }

  const handleAddNotes = (newNote) => {
    //setNotes((prevNotes) => [...prevNotes, newNote]);
    dispatch({ type: "addNote", payload: newNote });
  };
  const handleDeleteNote = (id) => {
    // const filteredNotes = notes.filter((note) => note.id !== id);
    // setNotes(filteredNotes);
    //setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    dispatch({ type: "deleteNote", payload: id });
  };
  const handleCompleteNote = (e) => {
    //console.log(e.target.value);
    const noteId = Number(e.target.value);
    // const newNotes = notes.map((note) =>
    //   note.id === noteId ? { ...note, completed: !note.completed } : note
    // );
    // setNotes(newNotes);
    // setNotes((prevNotes) =>
    //   prevNotes.map((note) =>
    //     note.id === noteId ? { ...note, completed: !note.completed } : note
    //   )
    // );
    dispatch({ type: "completeNote", payload: noteId });
  };

  return (
    <div className="container">
      <NoteHeader
        notes={notes}
        sortBy={sortBy}
        onSort={(e) => setSortBy(e.target.value)}
      />
      <div className="note-app">
        <AddNewNote onAddNote={handleAddNotes} />
        <div className="note-container">
          <NoteStatus notes={notes} />
          <NoteList
            notes={notes}
            sortBy={sortBy}
            onDeleteNote={handleDeleteNote}
            onCompleteNote={handleCompleteNote}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
