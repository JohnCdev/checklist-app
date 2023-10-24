export interface CreateNoteBody {
  title?: string;
  content?: string;
}

export interface UpdateNoteParams {
  noteId: string;
}

export interface UpdateNoteBody {
  title?: string;
  content?: string;
}
