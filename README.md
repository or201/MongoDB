# MongoDB Library Repository Manager

A modular Node.js backend utility that implements the Repository Pattern to manage authors and books using the native MongoDB driver (without Mongoose). It features strict schema validation using **Zod**, automated indexing for optimized query performance, and a clean, decoupled architecture.

---

## Features

- **Decoupled Repository Architecture:** Clean separation of concerns with dedicated repositories for authors (`authorRepository.js`) and books (`bookRepository.js`).
- **Robust Schema Validation:** Strict input validation and sanitization powered by **Zod** before any database write.
- **Foreign Key Validation:** The book creation process verifies that the associated author exists in the database before saving the book.
- **Automated Database Indexing:** Automatically creates optimized indexes:
  - **Text Index** on book `name` and `description` to support full-text search.
  - **Single-field Indexes** on `pages` and `authorId` for fast filtering, sorting, and joins.
- **Optimized Queries:**
  - Retrieve books by a specific author.
  - Full-text search on books with limit constraints.
  - Filter books by minimum page count with ascending sort order.

---

## Database Schema & Zod Validation

### 1. Authors (`authors` collection)

Validated using [authorValidator.js](file:///c:/User/Code/yesodotCourse/MongoDB/validators/authorValidator.js):

- `firstName` (String): Trimmed, minimum 2 characters.
- `lastName` (String): Trimmed, minimum 2 characters.
- `birthYear` (Number): Must be an integer between `1800` and `2226`.

### 2. Books (`books` collection)

Validated using [bookValidator.js](file:///c:/User/Code/yesodotCourse/MongoDB/validators/bookValidator.js):

- `name` (String): Trimmed, minimum 2 characters.
- `description` (String): Trimmed, minimum 2 characters.
- `publicationDateYear` (Number): Must be an integer between `1800` and `2226`.
- `authorId` (ObjectId): Must be a valid 24-character hex MongoDB ObjectId. The repository ensures this author exists in the database.
- `pages` (Number): Integer between `1` and `10,000`.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- A running [MongoDB](https://www.mongodb.com/) instance (local or MongoDB Atlas)

---

## Installation & Setup

1. **Clone the project and navigate to the directory:**

   ```bash
   cd MongoDB
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory (see [.env](file:///c:/User/Code/yesodotCourse/MongoDB/.env)) with the following variables:

   ```env
   MONGO_DB_CONNECTION=mongodb://localhost:27017
   DB_NAME=library
   BOOKS_COLLECTION=books
   AUTHORS_COLLECTION=authors
   ```

4. **Initialize Database Indexes:**
   Run the initialization script to connect to MongoDB, automatically generate the required collection indexes, and safely close the connection:
   ```bash
   npm start
   ```

---

## API & Repository Usage

### Database Connection

To connect or disconnect from the database programmatically, import the connection utilities from [db.js](file:///c:/User/Code/yesodotCourse/MongoDB/config/db.js):

```javascript
import { connectMongoDB, closeMongoDB } from "./config/db.js";

// Connect to MongoDB
await connectMongoDB();

// Close connection when done
await closeMongoDB();
```

### Author Repository (`authorRepository.js`)

#### `createAuthor(firstName, lastName, birthYear)`

Validates input via Zod and inserts a new author. Returns the `ObjectId` of the created author.

```javascript
import { createAuthor } from "./repositories/authorRepository.js";

try {
  const authorId = await createAuthor("J.R.R.", "Tolkien", 1892);
  console.log(`Author created with ID: ${authorId}`);
} catch (error) {
  console.error(`Failed to create author: ${error.message}`);
}
```

### Book Repository (`bookRepository.js`)

#### `createBook(name, description, publicationDateYear, authorId, pages)`

Validates input via Zod, checks if the author exists, converts `authorId` to a MongoDB `ObjectId`, and inserts the book. Returns the `ObjectId` of the created book.

```javascript
import { createBook } from "./repositories/bookRepository.js";

try {
  const bookId = await createBook(
    "The Hobbit",
    "A fantasy novel and children's book",
    1937,
    "60d5ecb8b39e6a00155b4f8d", // Valid Author ObjectId
    310,
  );
  console.log(`Book created with ID: ${bookId}`);
} catch (error) {
  console.error(`Failed to create book: ${error.message}`);
}
```

#### `getBooksByAuthor(authorId)`

Retrieves all books written by a specific author. Returns an array of books, or `null` if the author does not exist or the ID is invalid.

```javascript
import { getBooksByAuthor } from "./repositories/bookRepository.js";

const books = await getBooksByAuthor("60d5ecb8b39e6a00155b4f8d");
console.log(books);
```

#### `getBookBySearch(searchTerm, limit = 10)`

Performs an optimized full-text search on the `name` and `description` fields of the books collection.

```javascript
import { getBookBySearch } from "./repositories/bookRepository.js";

const searchResults = await getBookBySearch("fantasy", 5);
console.log(searchResults);
```

#### `getBooksByMinimumPages(minPages = 250)`

Retrieves all books that have more than `minPages` pages, sorted by page count in ascending order.

```javascript
import { getBooksByMinimumPages } from "./repositories/bookRepository.js";

const largeBooks = await getBooksByMinimumPages(300);
console.log(largeBooks);
```
