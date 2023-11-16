import { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import { Button, Container, Row, Spinner } from "react-bootstrap";
import styles from "./styles/NotesPage.module.css";
import stylesUtils from "./styles/utils.module.css";
import * as NotesApi from "./api/notes-api";
import AddEditNoteModal from "./components/AddEditNoteModal";
import { FaPlus } from "react-icons/fa";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
  const [notesLoading, setNotesLoading] = useState(true);
  const [notesShowError, setNotesShowError] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        setNotesShowError(true);
      } finally {
        setNotesLoading(false);
      }
    }
    loadNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  const notesGrid = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
      {notes.map((note) => {
        return (
          <Note
            note={note}
            className={styles.note}
            key={note._id}
            onNoteClick={setNoteToEdit}
            onDelete={deleteNote}
          />
        );
      })}
    </Row>
  );

  return (
    <div>
      <Container className={styles.notesPage}>
        <Button
          className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
          onClick={() => setShowAddNoteModal(true)}
        >
          <FaPlus />
          Add New Note
        </Button>
        {notesLoading && <Spinner animation="border" variant="primary" />}
        {notesShowError && (
          <p>Something went wrong. Please refresh the page.</p>
        )}
        {!notesLoading && !notesShowError && (
          <>
            {notes.length > 0 ? (
              notesGrid
            ) : (
              <p>You don't have any notes yet.</p>
            )}
          </>
        )}
        {showAddNoteModal && (
          <AddEditNoteModal
            onDismiss={() => setShowAddNoteModal(false)}
            onNoteSaved={(noteResponse) => {
              setNotes([...notes, noteResponse]);
              setShowAddNoteModal(false);
            }}
          />
        )}
        {noteToEdit && (
          <AddEditNoteModal
            noteToEdit={noteToEdit}
            onDismiss={() => setNoteToEdit(null)}
            onNoteSaved={(updatedNote) => {
              setNotes(
                notes.map((existingNote) =>
                  existingNote._id === updatedNote._id
                    ? updatedNote
                    : existingNote
                )
              );
              setNoteToEdit(null);
            }}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
