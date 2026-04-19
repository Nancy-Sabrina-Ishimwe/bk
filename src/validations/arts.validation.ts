
// import Joi from "joi";


// export interface ArtInput {
//   name: string;
//   description: string;
//   price: number;
//   category?: string;
//   available_Products: number;
//   image?: string;
// }

// // Arts Validation Schema
// const artValidationSchema = Joi.object<ArtInput>({
//   name: Joi.string().required(),
//   description: Joi.string().required(),
//   price: Joi.number().required(),
//   category: Joi.string().optional(),
//   available_Products: Joi.number().required(),
//   image: Joi.string().optional(),
// });

// // Function to validate arts data
// export const validateArt = (artsData: ArtInput) => {
//   return artValidationSchema.validate(artsData);
// };