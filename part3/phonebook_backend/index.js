require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const app = express();

const Person = require('./models/person');


// Example route
// app.get('/', (request, response) => response.send('Hello World'));

// Route Handlers
const getPersonsHandler = (request, response) => {
  Person
    .find({})
    .then(notes => response.json(notes));
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

const deletePersonHandler = (request, response) => {
  const id = request.params.id;

  persons = persons.filter(p => p.id !== id);

  response.status(204).end();
};

const generateId = () => Math.floor(Math.random() * 1000);
const hasSameName = (persons, name) => {
  return persons.some(person => person.name.toLowerCase() === name.toLowerCase());
};

const createPersonHandler = (request, response) => {
  const { name, number } = request.body;

  if (!name || !number) {
    const error = 'name or number are missing';
    return response.status(404).json(error);
  }

  if (hasSameName(persons, name)) {
    const error = 'name must be unique';
    return response.status(404).json(error);
  }

  const person = {
    name,
    number,
    id: String(generateId())
  };

  persons = persons.concat(person);
  response.json(person);
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
app.get('/api/persons/:id', getPersonHandler);
app.get('/info', getInfoHandler);

app.delete('/api/persons/:id', deletePersonHandler);

app.post('/api/persons', createPersonHandler);


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server listening to ${PORT}`));
