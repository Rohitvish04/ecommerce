// docs/swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'E-commerce Product API',
    description: 'REST API with Node.js, Prisma, and NeonDB',
  },
  host: 'ecommerce-1azq.onrender.com', // ✅ Update this after deployment
  schemes: ['https'],
};

const outputFile = './docs/swagger-output.json';
const endpointsFiles = ['./app.js']; // entry point

swaggerAutogen(outputFile, endpointsFiles, doc);
