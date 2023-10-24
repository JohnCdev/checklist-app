import { RequestHandler } from "express";
import NoteModel from "../models/note";
import { CreateNoteBody, UpdateNoteBody, UpdateNoteParams } from "../types";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  try {
    // error handling
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError("400", "Invalid note id");
    }
    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "Note not found");
    }
    // error handling

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  try {
    // error handling
    if (!title) {
      throw createHttpError(400, "Note must have a title");
    }
    // error handling

    const newNote = await NoteModel.create({
      title: title,
      content: content,
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const updatedTitle = req.body.title;
  const updatedContent = req.body.content;

  try {
    // error handling
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError("400", "Invalid note id");
    }
    if (!updatedTitle) {
      throw createHttpError(400, "Note must have a title");
    }
    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "Note not found");
    }
    // error handling

    note.title = updatedTitle;
    note.content = updatedContent;
    const updatedNote = await note.save();
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  try {
    // error handling
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError("400", "Invalid note id");
    }
    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "Note not found");
    }
    // error handling

    await note.deleteOne();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
