import Contact from "../models/contacts.model";

// service to create a message
export const createMessage = async (messageData) => {
  const { names, email, subject, message } = messageData;
  return await Contact.create({
    names,
    email,
    subject,
    message,
  });
};// services/contacts.services.ts
import Contact, { IContact } from "../models/contacts.model";
import { Types } from "mongoose";

// Define the shape of the message data for creation
interface CreateMessageData {
  names: string;
  email: string;
  subject: string;
  message: string;
}

// Service to create a message
export const createMessage = async (messageData: CreateMessageData): Promise<IContact> => {
  const { names, email, subject, message } = messageData;
  return await Contact.create({
    names,
    email,
    subject,
    message,
  });
};

// Service to retrieve all messages
export const getMessages = async (): Promise<IContact[]> => {
  return await Contact.find();
};

// Service to retrieve a single message by id
export const getOneMessage = async (messageId: string): Promise<IContact | null> => {
  return await Contact.findById(messageId);
};

// Service to delete a message
export const deleteMessage = async (id: string): Promise<void> => {
  await Contact.findByIdAndDelete(id);
};

// service to retrieve all Messages
export const getMessages = async () => {
  return await Contact.find()
};

// service to retrieve a single message by id
export const getOneMessage = async (messageId) => {
  return await Contact.findById(messageId)
};

// service delete a message
export const deleteMessage = async (id) => {
  await Contact.findByIdAndDelete(id);
};
