# coding-project-template

Understanding the user routes
Navigate to the router directory having the below 3 files:

booksdb.js - This contains the the preloaded book information for this application.

general.js - This contains the skeletal implementations for the routes which a general user can access.

auth_users.js - This contains the skeletal implementations for the routes which an authorized user can access.


Task 1:
Complete the code for getting the list of books available in the shop under public_users.get('/',function (req, res) {.
Hint: Use the JSON.stringify method for displaying the output neatly.

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));
});

Run npm install for installing the required modules.
Run npm start to start the server.



Task 2:
Complete the code for getting the book details based on ISBN under public_users.get('/isbn/:isbn',function (req, res) {.
Hint: Retrieve the ISBN from the request parameters

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const ISBN = req.params.isbn;
  
  res.send(books[ISBN])
 });


Task 3:
Complete the code for getting the book details based on the author under public_users.get('/author/:author',function (req, res) {.
Hints:
1. Obtain all the keys for the ‘books’ object.
2. Iterate through the ‘books’ array & check the author matches the one provided in the request parameters.

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let ans = []
    for(const [key, values] of Object.entries(books)){
        const book = Object.entries(values);
        for(let i = 0; i < book.length ; i++){
            if(book[i][0] == 'author' && book[i][1] == req.params.author){
                ans.push(books[key]);
            }
        }
    }
    if(ans.length == 0){
        return res.status(300).json({message: "Author not found"});
    }
    res.send(ans);
});



Task 4:
Complete the code for getting the book details based on the title under public_users.get('/title/:title',function (req, res) {.
Hint: This will be similar to Exercise 3

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let ans = []
  for(const [key, values] of Object.entries(books)){
      const book = Object.entries(values);
      for(let i = 0; i < book.length ; i++){
          if(book[i][0] == 'title' && book[i][1] == req.params.title){
              ans.push(books[key]);
          }
      }
  }
  if(ans.length == 0){
      return res.status(300).json({message: "Title not found"});
  }
  res.send(ans);
});


Task 5:
Complete the code for getting book reviews under public_users.get('/review/:isbn',function (req, res) {.
Hint: Get the book reviews based on ISBN provided in the request parameters.

// Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const ISBN = req.params.isbn;
  res.send(books[ISBN].reviews)
});



Task 6:
Complete the code for registering a new user
Hint: The code should take the ‘username’ and ‘password’ provided in the body of the request for registration. If the username already exists, it must mention the same & must also show other errors like eg. when username &/ password are not provided.

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

// Register a new user
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

Update and test the authenticated user routes in auth_users.js.

Task 7:
Complete the code for logging in as a registered user.
Hint: The code must validate and sign in a customer based on the username and password created in Exercise 6. It must also save the user credentials for the session as a JWT.
As you are required to login as a customer, while testing the output on Postman, use the endpoint as "customer/login"

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
   console.log("login: ", req.body);
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({message: "Error logging in"});
  }

  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
            accessToken,username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({message: "Invalid Login. Check username and password"});
    }
});


Task 8:
Complete the code for adding or modifying a book review.
Hint: You have to give a review as a request query & it must get posted with the username (stored in the session) posted. If the same user posts a different review on the same ISBN, it should modify the existing review. If another user logs in and posts a review on the same ISBN, it will get added as a different review under the same ISBN.

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
    const isbn = req.params.isbn;
    const review = req.body.review;
    const username = req.session.authorization.username;
    console.log("add review: ", req.params, req.body, req.session);
    if (books[isbn]) {
        let book = books[isbn];
        book.reviews[username] = review;
        return res.status(200).send("Review successfully posted");
    }
    else {
        return res.status(404).json({message: `ISBN ${isbn} not found`});
    }
	
});





Task 9:
Complete the code for deleting a book review under regd_users.delete("/auth/review/:isbn", (req, res) => {

Hint: Filter & delete the reviews based on the session username, so that a user can delete only his/her reviews and not other users’.

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;
  if (books[isbn]) {
      let book = books[isbn];
      delete book.reviews[username];
      return res.status(200).send("Review successfully deleted");
  }
  else {
      return res.status(404).json({message: `ISBN ${isbn} not found`});
  }
});







Improving the scope of Tasks 1-4 using Promises or Async-Await
You will now use Promise callbacks or Async-Await functions for doing the same functionality which we covered synchronously in Tasks 1-4.

Task 10:
Add the code for getting the list of books available in the shop (done in Task 1) using Promise callbacks or async-await with Axios.
Hint: Refer to this lab on Promises and Callbacks.

Please ensure that the general.js file has the code for getting the list of books available in the shop using Promise callbacks or async-await with Axios is covered.

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




Task 11:
Add the code for getting the book details based on ISBN (done in Task 2) using Promise callbacks or async-await with Axios.
Hint: Refer to this lab on Promises and Callbacks.

Please ensure that the general.js file has the code for getting the book details based on ISBN using Promise callbacks or async-await with Axios is covered.

const axios = require('axios');

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


Task 12:
Add the code for getting the book details based on Author (done in Task 3) using Promise callbacks or async-await with Axios.
Hint: Refer to this lab on Promises and Callbacks.

Please ensure that the general.js file has the code for or getting the book details based on Author using Promise callbacks or async-await with Axios is covered.

const axios = require('axios');

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


Task 13:
Add the code for getting the book details based on Title (done in Task 4) using Promise callbacks or async-await with Axios.
Hint: Refer to this lab on Promises and Callbacks.

Please ensure that the general.js file has the code for or getting the book details based on Title using Promise callbacks or async-await with Axios is covered.

const axios = require('axios');

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









