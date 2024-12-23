import { useState } from "react";

function AddNewNote({ onAddNote }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !desc) return null;
    const newNote = {
      title,
      desc,
      id: Date.now(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTitle("");
    setDesc("");
    //update notes
    onAddNote(newNote);
  };
  const handleChange = (e) => {
    //console.log(e.target.value);
    setTitle(e.target.value);
  };
  const handleDesc = (e) => {
    setDesc(e.target.value);
  };
  return (
    <div className="add-new-note">
      <h2>Add new note</h2>
      <form className="note-form" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={handleChange} // onChange = {(e) => setTitle(e.target.value)}
          type="text"
          className="text-field"
          placeholder="Note title..."
        />
        <input
          value={desc}
          onChange={handleDesc}
          type="text"
          className="text-field"
          placeholder="Note desc..."
        />
        <button type="submit" className="btn btn--primary">
          Add new note
        </button>
      </form>
    </div>
  );
}

export default AddNewNote;
