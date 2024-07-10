// home.js

/**
 * Gets the total number of books in the library.
 * @param {Array} books - The array of book objects.
 * @returns {number} - The total number of books.
 */
function getTotalBooksCount(books) {
  return books.length;
}

/**
 * Gets the total number of accounts registered with the library.
 * @param {Array} accounts - The array of account objects.
 * @returns {number} - The total number of accounts.
 */
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

/**
 * Gets the number of books that are currently checked out.
 * @param {Array} books - The array of book objects.
 * @returns {number} - The number of books currently checked out.
 */
function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => (book.borrows[0].returned ? acc : acc + 1), 0);
}

/**
 * Gets an array of the most common genres in the library.
 * @param {Array} books - The array of book objects.
 * @returns {Array} - An array of objects representing the most common genres.
 */
function getMostCommonGenres(books) {
  const genreCount = books.reduce((acc, book) => {
    const genre = acc.find(genre => genre.name === book.genre);
    if (genre) {
      genre.count++;
    } else {
      acc.push({ name: book.genre, count: 1 });
    }
    return acc;
  }, []);

  return genreCount
    .sort((genreA, genreB) => genreB.count - genreA.count)
    .slice(0, 5);
}

/**
 * Gets an array of the most popular books in the library based on borrow count.
 * @param {Array} books - The array of book objects.
 * @returns {Array} - An array of objects representing the most popular books.
 */
function getMostPopularBooks(books) {
  const sortedBooks = books
    .map(book => ({
      name: book.title,
      count: book.borrows.length,
    }))
    .sort((bookA, bookB) => bookB.count - bookA.count)
    .slice(0, 5);

  return sortedBooks;
}

/**
 * Gets an array of the most popular authors in the library based on borrow count of their books.
 * @param {Array} books - The array of book objects.
 * @param {Array} authors - The array of author objects.
 * @returns {Array} - An array of objects representing the most popular authors.
 */
function getMostPopularAuthors(books, authors) {
  const authorBorrowCounts = authors.map(author => {
    const authorBooks = books.filter(book => book.authorId === author.id);
    const borrowCount = authorBooks.reduce((acc, book) => acc + book.borrows.length, 0);
    return {
      name: `${author.name.first} ${author.name.last}`,
      count: borrowCount,
    };
  });

  return authorBorrowCounts
    .sort((authorA, authorB) => authorB.count - authorA.count)
    .slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
