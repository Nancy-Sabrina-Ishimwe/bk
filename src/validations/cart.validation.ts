// validations/cart.validation.ts
import Joi from "joi";

// Interface for cart item input (when adding/updating an item)
export interface CartItemInput {
  quantity: number;
}

// Validation schema for cart operations (add/update item quantity)
const cartValidationSchema = Joi.object<CartItemInput>({
  quantity: Joi.number().required().min(1), // Added min(1) to ensure positive quantity
});

// Function to validate cart data (quantity)
export const validateCart = (cartData: CartItemInput) => {
  return cartValidationSchema.validate(cartData);
};