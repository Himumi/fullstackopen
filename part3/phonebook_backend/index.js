const express = require('express');
const app = express();

// Persons data
let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  },
  {
    "id": "5",
    "name": "Himumi",
    "number": "00000000000"
  }
];

// Example route
app.get('/', (request, response) => response.send('Hello World'));

// Route Handlers
const getPersonsHandler = (request, response) => {
  response.json(persons);
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

const getInfoHandler = (request, response) => {
  const time = new Date;
  const personsLength = persons.length;

  const text = `
    <p>Phonebook has info for ${personsLength} people</p> 
    <p>${time.toString()}</p>
  `;

  response.send(text);
};

// Routes
app.get('/api/persons', getPersonsHandler);
app.get('/api/persons/:id', getPersonHandler);
app.get('/info', getInfoHandler);

app.delete('/api/persons/:id', deletePersonHandler);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server listening to ${PORT}`));