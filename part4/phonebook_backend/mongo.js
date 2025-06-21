const mongoose = require('mongoose');

// stop program when user does not type password
if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://himumi:${password}@cluster0.rtf699q.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`;

// mongoose Settings
mongoose.set('strictQuery', false);
mongoose.connect(url);
// console.log('connected to DB');

// create Schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// create Model 
const Person = mongoose.model('Person', personSchema);

// create new person and save to DB
if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  return person.save().then(result => {
    console.log(`Added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}

// print persons when user types without name and number
Person.find({}).then(result => {
  console.log('Phonebook:');
  result.forEach(person => console.log(person.name, person.number));
  mongoose.connection.close();
});
