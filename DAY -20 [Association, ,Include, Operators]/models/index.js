const sequelize = require('../db/connection');
const Author = require('./Author');
const Category = require('./Category');
const Book = require('./Book');
const Reader = require('./Reader');
const ReaderProfile = require('./ReaderProfile');
const Review = require('./Review');
const Loan = require('./Loan');

// --- Author <-> Book (belongsTo / hasMany, nullable FK) ---
Author.hasMany(Book, { foreignKey: 'authorId', as: 'books' });
Book.belongsTo(Author, { foreignKey: 'authorId', as: 'author' });

// --- Category self-referencing tree ---
Category.hasMany(Category, { as: 'children', foreignKey: 'parentId' });
Category.belongsTo(Category, { as: 'parent', foreignKey: 'parentId' });

// --- Category <-> Book ---
Category.hasMany(Book, { foreignKey: 'categoryId', as: 'books' });
Book.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// --- Reader <-> ReaderProfile (true 1:1) ---
Reader.hasOne(ReaderProfile, { foreignKey: 'readerId', as: 'profile' });
ReaderProfile.belongsTo(Reader, { foreignKey: 'readerId', as: 'reader' });

// --- Review (belongsTo both Reader and Book) ---
Reader.hasMany(Review, { foreignKey: 'readerId', as: 'reviews' });
Review.belongsTo(Reader, { foreignKey: 'readerId', as: 'reader' });
Book.hasMany(Review, { foreignKey: 'bookId', as: 'reviews' });
Review.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });

// --- Reader <-> Book many-to-many via Loan (extra columns) ---
Reader.belongsToMany(Book, { through: Loan, foreignKey: 'readerId', otherKey: 'bookId', as: 'borrowedBooks' });
Book.belongsToMany(Reader, { through: Loan, foreignKey: 'bookId', otherKey: 'readerId', as: 'borrowers' });

// direct access to junction rows themselves
Reader.hasMany(Loan, { foreignKey: 'readerId', as: 'loans' });
Loan.belongsTo(Reader, { foreignKey: 'readerId' });
Book.hasMany(Loan, { foreignKey: 'bookId', as: 'loans' });
Loan.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = { sequelize, Author, Category, Book, Reader, ReaderProfile, Review, Loan };