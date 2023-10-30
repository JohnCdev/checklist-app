import React from "react";
import styles from "../styles/Note.module.css";
import { Note as NoteModel } from "../models/note";
import { Card } from "react-bootstrap";

interface NoteProps {
  note: NoteModel;
}

const Note = ({ note }: NoteProps) => {
  const { title, content, createdAt, updatedAt } = note;

  return (
    <div>
      <Card className={styles.noteCard}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text className={styles.cardText}>{content}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Note;
