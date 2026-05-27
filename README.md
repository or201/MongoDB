# MongoDB Authors & Books Manager

This project is a Node.js script that interacts with a MongoDB database using the native MongoDB driver (without Mongoose). It manages information about authors and the books they have written, designed and indexed for optimal query performance.

## Features

- **Document Creation:** Built-in functions to create and insert new author and book documents into their appropriate collections.
- **Optimized Queries:**
  - Retrieve all books written by a specific author (including all book details).
  - Search for books by title or description without requiring an exact match (text search).
  - Retrieve all books with more than 250 pages, sorted by the number of pages in ascending order.
- **Automatic Indexing:** The script automatically generates the necessary database indexes upon execution to ensure queries run as efficiently and quickly as possible.

## Database Data

The database handles the following data entities:

**Books:**

- Title
- Description
- Publish Date
- Author
- Number of Pages

**Authors:**

- First Name
- Last Name
- Birth Year

_(The collections are structured to provide the best average performance for the required queries.)_

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- A running instance of [MongoDB](https://www.mongodb.com/) (locally or via MongoDB Atlas).

## Installation

1. Navigate to the project directory.
2. Initialize the project and install the native MongoDB driver (if not already done):

   ```bash
   npm i
   ```

## Usage

Run the main script using Node.js. The script will handle the connection, index creation, data insertion, and query execution without needing a local web server.

```bash
node index.js
```

_(Note: Replace `index.js` with the actual name of your script file if it differs)_
