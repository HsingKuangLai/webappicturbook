import BookModel from "../models/bookModel.js";


export const getBooks = async (req, res) => {
  const {name} = req.query;

  if (!name) {
    return res
      .status(400)
      .json({ message: "Book not found!" });
  }

  try {
    const books = await BookModel.findOne({"name":name});
    if (!books){
      console.log("Book not found QQ");
    }
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Create a member
export const createBook = async (req, res) => {
  const { name, category, author, times } = req.body;

  // Check title and description
  if (!name || !category || !author || !times) {
    return res
      .status(400)
      .json({ message: "Information are required!" });
  }

  // Create a new member
  try {
    const newBook = await BookModel.create({
      name, 
      category, 
      author, 
      times
    });
    return res.status(201).json(newBook);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update a member
export const updateBook = async (req, res) => {
  const { id } = req.params;
  
  // This is empty
  console.log("This is sooooooo empty");

  try {
    return res.status(200).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a member
export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {

    const existedBook = await BookModel.findById(id);
    if (!existedBook) {
      return res.status(404).json({ message: "Member not found!" });
    }

    await BookModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Member deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
