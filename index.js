require('dotenv').config();

// console.log('DB:::::::', process.env['MONGODB'])
module.exports = {
  development: {
    MONGODB: process.env['MONGODB'] || "mongodb+srv://alexis:TqYIOTL6KvjFOY8a@storieproducts.ueuuvyf.mongodb.net", // local "mongodb://127.0.0.1:27017/SantaFE",
    MONGODB_OPTIONS: {
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    },
  },
  production: {
    MONGODB: process.env['MONGODB'],
    MONGODB_OPTIONS: {
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    },
  },
}

