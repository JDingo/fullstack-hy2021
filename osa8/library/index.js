require('dotenv').config()
const { ApolloServer, UserInputError, gql } = require('apollo-server')

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connection to MongoDB', error.message)
  })

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: String
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      name: String!
      genres: [String!]
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      if (args.author !== undefined) {
        filteredBooks = filteredBooks.filter(book => book.author === args.author)
      }

      else if (args.genre !== undefined) {
        filteredBooks = Book.find({ genres: { $in: [args.genre] } })
      }

      else {
        filteredBooks = Book.find({})
      }

      return filteredBooks

    },
    allAuthors: () => Author.find({}),


  },

  Book: {
    author: async (root) => {
      const author = await Author.findById(root.author)

      return {
        name: author.name,
        born: author.born
      }
    }
  },

  Author: {
    bookCount: async (root) => {
      const books = await Book
        .find({})
        .populate('author')

      return books.reduce((accumulator, currentBook) => (root.name === currentBook.author.name) ? accumulator + 1 : accumulator, 0) 
    }
  },

  Mutation: {
    addBook: async (root, args) => {
      let book;
      const author = await Author.findOne({ name: args.name })

      if (!author) {
        const newAuthor = new Author({ name: args.name, born: null })

        try {
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }

        book = new Book({ ...args, author: newAuthor })
      } else {
        book = new Book({ ...args, author })
      }

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return book
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo

      return author.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})