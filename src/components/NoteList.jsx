function NoteList({ notes, onDeleteNote, onCompleteNote, sortBy }) {
  let sortedNotes = notes;
  if (sortBy === "earliest")
    sortedNotes = [...notes].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    ); // sort mutates state => !!React says do not mutate state!! ==> [..notes] clone, copy
  if (sortBy === "latest")
    sortedNotes = [...notes].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  if (sortBy === "completed")
    sortedNotes = [...notes].sort(
      (a, b) => Number(a.completed) - Number(b.completed)
    );
  return (
    <div className="note-list">
      {sortedNotes.map((note) => {
        return (
          <NoteItem
            key={note.id}
            note={note}
            onDeleteNote={onDeleteNote}
            onCompleteNote={onCompleteNote}
          />
        );
      })}
    </div>
  );
}

export default NoteList;

function NoteItem({ note, onDeleteNote, onCompleteNote }) {
  const options = {
    date: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <div className={`note-item ${note.completed? "completed" : ""}`}>
      <div className="note-item__header">
        <div>
          <p className="title">{note.title}</p>
          <p className="desc">{note.description}</p>
        </div>
        <div className="actions">
          <button onClick={() => onDeleteNote(note.id)}>❌</button>
          <input
            onChange={onCompleteNote}
            checked={note.completed}
            type="checkbox"
            id={note.id}
            name={note.id}
            value={note.id}
          />
        </div>
      </div>
      <div className="note-item__footer">
        {new Date(note.createdAt).toLocaleDateString("en-Us", options)}
      </div>
    </div>
  );
}
