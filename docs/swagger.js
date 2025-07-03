// docs/swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'E-commerce Product API',
    description: 'REST API with Node.js, Prisma, and NeonDB',
  },
  host: 'localhost:3000',   // ✅ Update this after deployment
  schemes: ['http'],
};

const outputFile = './docs/swagger-output.json';
const endpointsFiles = ['./app.js']; // entry point

swaggerAutogen(outputFile, endpointsFiles, doc);
