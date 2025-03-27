# coding-project-template

Understanding the user routes
Navigate to the router directory having the below 3 files:

booksdb.js - This contains the the preloaded book information for this application.

general.js - This contains the skeletal implementations for the routes which a general user can access.

auth_users.js - This contains the skeletal implementations for the routes which an authorized user can access.


Task 1:
Complete the code for getting the list of books available in the shop under public_users.get('/',function (req, res) {.
Hint: Use the JSON.stringify method for displaying the output neatly.

Run npm install for installing the required modules.
Run npm start to start the server.



Task 2:
Complete the code for getting the book details based on ISBN under public_users.get('/isbn/:isbn',function (req, res) {.
Hint: Retrieve the ISBN from the request parameters


Task 3:
Complete the code for getting the book details based on the author under public_users.get('/author/:author',function (req, res) {.
Hints:
1. Obtain all the keys for the ‘books’ object.
2. Iterate through the ‘books’ array & check the author matches the one provided in the request parameters.


Task 4:
Complete the code for getting the book details based on the title under public_users.get('/title/:title',function (req, res) {.
Hint: This will be similar to Exercise 3


Task 5:
Complete the code for getting book reviews under public_users.get('/review/:isbn',function (req, res) {.
Hint: Get the book reviews based on ISBN provided in the request parameters.


Task 6:
Complete the code for registering a new user
Hint: The code should take the ‘username’ and ‘password’ provided in the body of the request for registration. If the username already exists, it must mention the same & must also show other errors like eg. when username &/ password are not provided.





