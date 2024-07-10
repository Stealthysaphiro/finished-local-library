const { findAccountById } = require('./accounts.js');

/**
 * Finds an author by their ID.
 * @param {Array} authors - The array of author objects.
 * @param {number} id - The ID of the author to find.
 * @returns {object} - The author object if found, otherwise undefined.
 */
function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

/**
 * Finds a book by its ID.
 * @param {Array} books - The array of book objects.
 * @param {string} id - The ID of the book to find.
 * @returns {object} - The book object if found, otherwise undefined.
 */
function findBookById(books, id) {
  return books.find(book => book.id === id);
}

/**
 * Partitions books by their borrowed status.
 * @param {Array} books - The array of book objects.
 * @returns {Array} - An array with two arrays inside of it. The first array contains books that are currently borrowed, and the second array contains books that have been returned.
 */
function partitionBooksByBorrowedStatus(books) {
  const borrowed = books.filter(book => !book.borrows[0].returned);
  const returned = books.filter(book => book.borrows[0].returned);
  return [borrowed, returned];
}

/**
 * Gets the borrowers for a book.
 * @param {object} book - The book object.
 * @param {Array} accounts - The array of all account objects.
 * @returns {Array} - An array of ten or fewer account objects that represents the accounts given by the IDs in the provided book's borrows array. Each account object includes the returned entry from the corresponding transaction object in the borrows array.
 */
function getBorrowersForBook(book, accounts) {
  return book.borrows.map(borrow => {
    const account = findAccountById(accounts, borrow.id);
    return {
      ...account,
      returned: borrow.returned,
    };
  }).slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
