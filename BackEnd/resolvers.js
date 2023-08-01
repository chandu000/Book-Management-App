// resolvers.js

const resolvers = {
  Query: {
    books: async (_, { searchQuery, year, author },{prisma}) => {
      const filterOptions = {};

      // Implement search and filtering based on the query parameters
      if (searchQuery) {
        filterOptions.OR = [
          { title: { contains: searchQuery } },
          { author: { contains: searchQuery } },
        ];
      }

      if (year) {
        filterOptions.publicationYear = year;
      }

      if (author) {
        filterOptions.author = { contains: author };
      }

      return prisma.book.findMany({
        where: filterOptions,
      });
    },
    book: async (_, { id }, { prisma }) => {
      return prisma.book.findUnique({ where: { id } });
    },
  },
  Mutation: {
    createBook: async (_, { title, author, publicationYear }, { prisma }) => {
      return prisma.book.create({
        data: {
          title,
          author,
          publicationYear,
        },
      });
    },
    updateBook: async (_, { id, title, author, publicationYear }, { prisma }) => {
      return prisma.book.update({
        where: { id },
        data: {
          title,
          author,
          publicationYear,
        },
      });
    },
    deleteBook: async (_, { id },{prisma}) => {
      return prisma.book.delete({
        where: { id },
      });
    },
  },
};

module.exports = resolvers;
