import Message from "./Message";
function NoteStatus({ notes }) {
  //derived state:
  const allNotes = notes.length;
  const completedNotes = notes.filter((note) => note.completed).length;
  const unCompletedNotes = allNotes - completedNotes;

  if (!allNotes)
    return (
      <Message>
        ❌
        <span>No notes have been added</span>
        <span>&times;</span>
        {/* children prop */}
      </Message>
    );

  return (
    <ul className="note-status">
      <li>
        All
        <span>{allNotes}</span>
      </li>
      <li>
        Completed
        <span>{completedNotes}</span>
      </li>
      <li>
        Open
        <span>{unCompletedNotes}</span>
      </li>
    </ul>
  );
}

export default NoteStatus;
