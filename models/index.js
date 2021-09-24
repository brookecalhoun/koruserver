const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/journallib';

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,

};
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
mongoose.connect(connectionString, configOptions)
  .then(() => console.log('MongoDB successfully connected...'))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));
  
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${mongoose.connection.host}:${mongoose.connection.port}`)
})
module.exports = {
  Journal: require('./Journal').Journal,
  User: require('./User')
};