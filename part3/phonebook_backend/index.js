require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const app = express();

const Person = require('./models/person');


// Example route
// app.get('/', (request, response) => response.send('Hello World'));

// Route Handlers
const getPersonsHandler = (request, response, next) => {
  Person
    .find({})
    .then(persons => response.json(persons))
    .catch(error => next(error));
};

const getPersonHandler = (request, response) => {
  const id = request.params.id;
  const person = persons.find(n => n.id === id);

  if (!person) {
    const errorMessage = { error: 'person is not found' };
    return response.status(404).json(errorMessage);
  }

  return response.json(person);
};

const deletePersonHandler = (request, response, next) => {
  Person
    .findByIdAndDelete(request.params.id)
    .then(result => response.status(204).end())
    .catch(error => next(error));
};

const generateId = () => Math.floor(Math.random() * 1000);
const hasSameName = (persons, name) => {
  return persons.some(person => person.name.toLowerCase() === name.toLowerCase());
};

const createPersonHandler = (request, response) => {
  const { name, number } = request.body;
  console.log('name:', name, 'number', number);

  if (!name || !number) {
    const error = 'name or number are missing';
    return response.status(404).json(error);
  }

  // if (hasSameName(persons, name)) {
  //   const error = 'name must be unique';
  //   return response.status(404).json(error);
  // }

  const newPerson = new Person({ name, number });

  newPerson
    .save()
    .then(savedPerson => response.json(savedPerson));
};

const getInfoHandler = (request, response) => {
  const time = new Date;
  const personsLength = persons.length;

  const text = `
    <p>Phonebook has info for ${personsLength} people</p> 
    <p>${time.toString()}</p>
  `;

  response.send(text);
};

morgan.token('body', (req, res) => JSON.stringify(req.body));
const morganTokens = ':method :url :status - :response-time ms :body';
const customMorgan = morgan(morganTokens);

// middlewares
app.use(express.static('dist'));
app.use(express.json());
app.use(morgan(morganTokens));

// Routes
app.get('/api/persons', getPersonsHandler);
app.post('/api/persons', createPersonHandler);
app.delete('/api/persons/:id', deletePersonHandler);
// app.get('/api/persons/:id', getPersonHandler);
// app.get('/info', getInfoHandler);

// Middleware's Handlers
const errorHandler = (error,request, response, next) => {
  console.log(error);

  if (error.name === 'CastError') {
    return response.status(404).json({ error: 'malformated id' });
  }

  next(error);
};

// Middlewares
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server listening to ${PORT}`));
