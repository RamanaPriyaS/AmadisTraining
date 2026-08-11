require('dotenv').config();

const { Op, literal } = require('sequelize');

const {
  sequelize,
  Author,
  Category,
  Book,
  Reader,
  ReaderProfile,
  Review,
  Loan
} = require('./models');

// async function task1() {
//   const authors = await Author.findAll({
//     include: [
//       {
//         model: Book,
//         as: 'books'
//       }
//     ]
//   });
//   return authors;
// }



// async function task2() {

//   const authors = await Author.findAll({
//     include: [
//       {
//         model: Book,
//         as: 'books',
//         required: true
//       }
//     ]
//   });

//   return authors;
// }



// async function task3() {

//   const books = await Book.findAll({
//     include: [
//       {
//         model: Author,
//         as: 'author'
//       }
//     ]
//   });

//   return books;
// }

// async function task4() {
//   const categories = await Category.findAll({
//     include: [
//       {
//         model: Category,
//         as: 'parent'
//       },
//       {
//         model: Category,
//         as: 'children'
//       }
//     ]
//   });
//   return categories;
// }


// async function task5() {

//   const categories = await Category.findAll({
//     include: [
//       {
//         model: Book,
//         as: 'books'
//       }
//     ]
//   });
//   return categories;
// }

// async function task6() {
//   const readers = await Reader.findAll({
//     include: [
//       {
//         model: ReaderProfile,
//         as: 'profile'
//       }
//     ]
//   });

//   return readers;
// }

// async function task7() {
//   const books = await Book.findAll({
//     include: [
//       {
//         model: Review,
//         as: 'reviews',
//         where: {
//           rating: 5
//         },
//         required: false
//       }
//     ]
//   });
//   return books;
// }


// async function task8() {

//   const alice = await Reader.findOne({
//     where: {
//       name: 'Alice'
//     },

//     include: [
//       {
//         model: Book,
//         as: 'borrowedBooks'
//       }
//     ]
//   });

//   return alice;
// }


// async function task9() {
//   const books = await Book.findAll({
//     include: [
//       {
//         model: Reader,
//         as: 'borrowers',

//         through: {
//           where: {
//             returnedAt: {
//               [Op.is]: null
//             }
//           }
//         },
//         required: true
//       }
//     ]
//   });
//   return books;
// }


// async function task10() {

//   const books = await Book.findAll({
//     where: {
//       price: {
//         [Op.between]: [10, 20]
//       },

//       published: {
//         [Op.eq]: true
//       }
//     }
//   });

//   return books;
// }



async function task11() {

  const authors = await Author.findAll({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: '%Tolkien%'
          }
        },
        {
          name: {
            [Op.like]: '%Orwell%'
          }
        }
      ]
    }
  });

  return authors;
}



(async () => {

  try {
    const result = await task11();
    console.log(result);
  } catch (error) {
    console.error(error);
  } finally {
    await sequelize.close();
  }
})();