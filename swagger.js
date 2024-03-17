const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Rental Application API',
    description: 'This application stores landlords, users and properties for a rental project'
  },
  host: 'localhost:4000',
  schema: ["https", "http"]
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);