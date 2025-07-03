const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./docs/swagger-output.json');

// MVC Routes
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

app.use(express.json());
 

// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));  //change ->  /api-docs

// #swagger.tags = ['General']
// #swagger.description = 'API Docs for Products and Categories'


// App routes
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
