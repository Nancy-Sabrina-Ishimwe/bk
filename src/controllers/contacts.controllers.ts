// contacts.controllers.ts
import { Request, Response } from "express";
import Contact from "../models/contacts.model";
import * as messageService from "../services/contacts.services";
import { validateCreateMessage } from "../validations/contacts.validation";

// controller to create a message
export const createMessage = async (req: Request, res: Response): Promise<void> => {
  const { error, value } = validateCreateMessage(req.body);
  if (error) {
    res.status(400).json({
      message: error.details[0].message,
    });
    return;
  }
  try {
    const createdMessage = await messageService.createMessage(value);
    res.status(201).json({
      status: "201",
      message: "Message sent",
      data: createdMessage,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: "500",
      message: "Failed to send a message",
      error: error.message,
    });
  }
};

// controller to retrieve all messages
export const getMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const messages = await messageService.getMessages();
    res.status(200).json({
      status: "200",
      message: "Messages retrieved",
      data: messages,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: "500",
      message: "Failed to retrieve messages",
      error: error.message,
    });
  }
};

// controller to retrieve single message by id
export const getOneMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { messageId } = req.params;
    const message = await messageService.getOneMessage(messageId);

    if (!message) {
      res.status(404).json({
        status: "404",
        message: "Message not found",
      });
      return;
    }

    res.status(200).json({
      status: "200",
      message: "Message retrieved",
      data: message,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "500",
      message: "Failed to retrieve message",
      error: error.message,
    });
  }
};

// controller to delete a message
export const deleteMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const findId = await Contact.findById(id);
    if (!findId) {
      res.status(404).json({
        status: "404",
        message: "Message not found",
      });
      return;
    }
    await messageService.deleteMessage(id);
    res.status(200).json({
      status: "200",
      message: "Message deleted",
    });
  } catch (error: any) {
    res.status(500).json({
      status: "500",
      message: "Failed to delete message",
      error: error.message,
    });
  }
};