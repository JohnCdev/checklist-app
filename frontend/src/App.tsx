import { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import { Container, Row } from "react-bootstrap";
import styles from "./styles/NotesPage.module.css";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch("/api/notes", {
          method: "GET",
        });
        const notes = await response.json();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  return (
    <div>
      <Container>
        <Row xs={1} md={2} xl={3} className="g-4">
          {notes.map((note) => {
            return <Note note={note} className={styles.note} key={note._id} />;
          })}
        </Row>
      </Container>
    </div>
  );
}

export default App;
