// import express, { Router } from "express";
// import { serve, setup } from "swagger-ui-express";
// import { OpenAPIV3 } from "openapi-types";

// const docrouter: Router = express.Router();

// const options: OpenAPIV3.Document = {
//   openapi: "3.0.1",
//   info: {
//     title: "Welcome to the Gb Group Kingdom API",
//     version: "1.0.0",
//     description: "Gb Group Kingdom API.",
//   },
//   servers: [
//     {
//       url: "/api/v1",
//     },
//   ],
//   security: [
//     {
//       bearerAuth: [],
//     },
//   ],
//   tags: [
//     { name: "Users", description: "Operations related to Users entities" },
//     { name: "Products", description: "Operations related to Products entities" },
//     { name: "Cart", description: "Operations related to Cart entities" },
//     { name: "Posts", description: "Operations related to Posts entities" },
//     { name: "Messages", description: "Operations related to Messages entities" },
//     { name: "Testimonials", description: "Operations related to Testimonials entities" },
//   ],
//   paths: {
//     // KEEP ALL YOUR PATHS EXACTLY AS THEY ARE
//   },
//   components: {
//     securitySchemes: {
//       bearerAuth: {
//         type: "http",
//         scheme: "bearer",
//         bearerFormat: "JWT",
//       },
//     },
//   },
// };

// docrouter.use("/", serve, setup(options));

// export default docrouter;