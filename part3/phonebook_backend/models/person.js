require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('connecting to DB');
mongoose
  .connect(url)
  .then(result => console.log('connected to DB'))
  .catch(error => console.log('error connecting to DB', error.message));
  
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Name is too short than the minimum allowed length(3)'],
    required: true
  },
  number: {
    type: String,
    minLength: [8, 'Number is too short'],
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d+$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number`,
    }
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;