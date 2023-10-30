import React from "react";
import styles from "../styles/Note.module.css";
import { Note as NoteModel } from "../models/note";
import { Card } from "react-bootstrap";
import { formatDate } from "../utils/formatDate";

interface NoteProps {
  note: NoteModel;
  className?: string;
}

const Note = ({ note, className }: NoteProps) => {
  const { title, content, createdAt, updatedAt } = note;

  let updatedAtText: string;
  if (updatedAt > createdAt) {
    updatedAtText = "Updated: " + formatDate(updatedAt);
  } else {
    updatedAtText = "Created: " + formatDate(createdAt);
  }

  return (
    <div>
      <Card className={`${styles.noteCard} ${className}`}>
        <Card.Body className={styles.cardBody}>
          <Card.Title>{title}</Card.Title>
          <Card.Text className={styles.cardText}>{content}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">{updatedAtText}</Card.Footer>
      </Card>
    </div>
  );
};

export default Note;
