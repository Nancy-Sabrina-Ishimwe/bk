// validations/contacts.validation.ts
import Joi from "joi";

// Interface for the message input data
export interface CreateMessageInput {
  names: string;
  email: string;
  subject: string;
  message: string;
}

// Validation schema for creating a new message
const createMessageSchema = Joi.object<CreateMessageInput>({
  names: Joi.string().required().min(3).max(30),
  email: Joi.string().email().required(),
  subject: Joi.string().required().min(3).max(100),
  message: Joi.string().required().min(6).max(255),
});

// Function to validate message creation
export const validateCreateMessage = (messageData: CreateMessageInput) => {
  return createMessageSchema.validate(messageData);
};