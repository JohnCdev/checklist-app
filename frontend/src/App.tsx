import { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import { Button, Container, Row } from "react-bootstrap";
import styles from "./styles/NotesPage.module.css";
import stylesUtils from "./styles/utils.module.css";
import * as NotesApi from "./api/notes-api";
import AddEditNoteModal from "./components/AddEditNoteModal";
import { FaPlus } from "react-icons/fa";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
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

  return (
    <div>
      <Container>
        <Button
          className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
          onClick={() => setShowAddNoteModal(true)}
        >
          <FaPlus />
          Add New Note
        </Button>
        <Row xs={1} md={2} xl={3} className="g-4">
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
