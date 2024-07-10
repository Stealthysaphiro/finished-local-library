// accounts.js

/**
 * Finds an account by its ID.
 * @param {Array} accounts - The array of account objects.
 * @param {string} id - The ID of the account to find.
 * @returns {object} - The account object if found, otherwise undefined.
 */
function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

/**
 * Sorts an array of account objects alphabetically by last name.
 * @param {Array} accounts - The array of account objects.
 * @returns {Array} - The sorted array of account objects.
 */
function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  );
}

/**
 * Gets the total number of times an account has borrowed books.
 * @param {object} account - The account object.
 * @param {Array} books - The array of all book objects.
 * @returns {number} - The total number of borrows by the account.
 */
function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  let totalBorrows = 0;
  for (let book of books) {
    for (let borrow of book.borrows) {
      if (borrow.id === accountId) {
        totalBorrows++;
      }
    }
  }
  return totalBorrows;
}

/**
 * Gets all books currently checked out by an account, including author information.
 * @param {object} account - The account object.
 * @param {Array} books - The array of all book objects.
 * @param {Array} authors - The array of all author objects.
 * @returns {Array} - An array of book objects currently checked out by the account.
 */
function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
  const borrowedBooks = [];
  for (let book of books) {
    const recentBorrow = book.borrows[0];
    if (recentBorrow.id === accountId && !recentBorrow.returned) {
      const author = findAuthorById(authors, book.authorId);
      book.author = author;
      borrowedBooks.push(book);
    }
  }
  return borrowedBooks;
}

/**
 * Finds an author by their ID.
 * @param {Array} authors - The array of author objects.
 * @param {number} id - The ID of the author to find.
 * @returns {object} - The author object if found, otherwise undefined.
 */
function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
