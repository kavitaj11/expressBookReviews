const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

const public_users = express.Router();

const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;


  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  // Simulating an async operation using a Promise
  const getBooks = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(books);
      }, 100); // simulate delay (e.g., database read)
    });
  };

  try {
    const allBooks = await getBooks();
    res.status(200).send(JSON.stringify(allBooks, null, 4));
  } catch (err) {
    res.status(500).json({ message: "Error fetching books" });
  }
});


// Get book details based on ISBN using Axios
public_users.get('/isbn/:isbn', async function (req, res) {
  const ISBN = req.params.isbn;

  try {
    // Simulating a request to an external API (could be another route or localhost)
    const response = await axios.get(`http://localhost:5000/books/`);
    const allBooks = response.data;

    if (allBooks[ISBN]) {
      res.status(200).json(allBooks[ISBN]);
    } else {
      res.status(404).json({ message: "Book not found for the given ISBN" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving book data", error: error.message });
  }
});

  
// Get book details based on Author using Axios
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;

  try {
    // Simulate fetching all books from an external API (like your own route)
    const response = await axios.get('http://localhost:5000/books/');
    const allBooks = response.data;

    // Filter books by the provided author
    const matchingBooks = Object.values(allBooks).filter(
      (book) => book.author.toLowerCase() === author.toLowerCase()
    );

    if (matchingBooks.length > 0) {
      res.status(200).json(matchingBooks);
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books", error: error.message });
  }
});



// Get book details based on Title using Axios
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;

  try {
    // Simulate fetching all books from an external API
    const response = await axios.get('http://localhost:5000/books/');
    const allBooks = response.data;

    // Filter books by the provided title
    const matchingBooks = Object.values(allBooks).filter(
      (book) => book.title.toLowerCase() === title.toLowerCase()
    );

    if (matchingBooks.length > 0) {
      res.status(200).json(matchingBooks);
    } else {
      res.status(404).json({ message: "Title not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books", error: error.message });
  }
});



//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const ISBN = req.params.isbn;
  res.send(books[ISBN].reviews)
});

module.exports.general = public_users;
