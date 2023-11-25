import {
    createBook,
    getBooks,
    updateBook,
    deleteBook,
  } from "../controllers/book.js";
  import express from "express";
  
  // Create an express router
  const router = express.Router();
  
  // Every path we define here will get /api/todos prefix
  // To make code even more cleaner we can wrap functions in `./controllers` folder
  
  // GET /api/todos
  router.get("/", getBooks);
  // POST /api/todos
  router.post("/", createBook);
  // PUT /api/todos/:id
  router.put("/:id", updateBook);
  // DELETE /api/todos/:id
  router.delete("/:id", deleteBook);
  
  // export the router
  export default router;
  