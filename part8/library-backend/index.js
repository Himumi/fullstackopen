require('dotenv').config()
const _ = require('lodash')
const { v1: uuid } = require('uuid')

const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

mongoose.set('strictQuery', false)

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to MongoDB')

mongoose.connect(MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('failed to connecting to MongoDB', error))

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `#graphql
  type Author {
    name: String!
    id: ID!
    born: Int
  }

  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }

  type AllAuthors {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String
      genre: String
    ): [Book!]!
    allAuthors: [AllAuthors!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const findAuthor = (authors, author) => 
  _.find(authors, ['name', author])

// Queries
const allBooksQuery = (root, args) => {
  switch (false) {
    // Check both author & genre are given in args
    case _.every(args): {
      const authorAndGenreFilter = (book) => 
        book.genres.includes(args.genre)
        && book.author === args.author

      return books.filter(authorAndGenreFilter)
    }
    // Check author is given
    case !args.author: {
      return _.filter(books, ['author', args.author])
    }
    // Check genre is given
    case !args.genre: {
      const isGenreIncluded = (book) => 
        book.genres.includes(args.genre)

      return books.filter(isGenreIncluded)
    }
    // Return all books
    default:
      return books
  }
}

const allAuthorsQuery = () => {
  // Group by author & count its books
  const countBookByAuthor = _.countBy(books, 'author')
  const addBookCount = (author) => new Object({
    ...author,
    bookCount: countBookByAuthor[author.name] 
  })
  // Add bookCount to authors
  return authors.map(addBookCount)
}

// Mutations
const addBookMutation = (root, args) => {
  const isExisted = findAuthor(authors, args.author)

  // When a new author is not in authors
  if (!isExisted) {
  // Add a new author to authors
  authors = authors.concat({
    name: args.author,
    id: uuid()
  })
  }

  const createdBook = {
  ...args, id: uuid()
  }
  books = books.concat(createdBook)
  return createdBook
}

const editAuthorMutation = (root, args) => {
  const author = findAuthor(authors, args.name)

  // When author is not found
  if (!author) {
    return null
  }

  const updatedAuthor = {
    ...author,
    born: args.setBornTo
  }

  const updateAuthors = (author) =>  
    author.name === updatedAuthor.name ? updatedAuthor : author
  authors = authors.map(updateAuthors)

  return updatedAuthor
}

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: allBooksQuery,
    allAuthors: allAuthorsQuery,
  },
  Mutation: {
    addBook: addBookMutation,
    editAuthor: editAuthorMutation,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})