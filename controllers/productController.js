const prisma = require('../models/prismaClient');

// GET /products - Fetch all products (with optional filters)
exports.getAllProducts = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;

    const filters = {};
    if (category) filters.categoryId = parseInt(category);
    if (search) filters.name = { contains: search, mode: 'insensitive' };

    const products = await prisma.product.findMany({
      where: filters,
      skip: (page - 1) * limit,
      take: parseInt(limit),
      include: { category: true }, // 💡 requires proper relation in schema.prisma
    });

    res.json(products);
  } catch (error) {
    console.error('💥 Error in getAllProducts:', error);
    res.status(500).json({ error: 'Something went wrong while fetching products.' });
  }
};

// GET /products/:id - Fetch product by ID
exports.getProductById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) return res.status(404).json({ error: 'Product not found.' });

    res.json(product);
  } catch (error) {
    console.error('💥 Error fetching product:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

// POST /products - Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId } = req.body;

    if (!name || !price || !categoryId) {
      return res.status(400).json({ error: 'Name, price, and categoryId are required.' });
    }

    const categoryExists = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!categoryExists) {
      return res.status(400).json({ error: 'Category not found.' });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category: { connect: { id: categoryId } },
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('💥 Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product.' });
  }
};

// PUT /products/:id - Update product by ID
exports.updateProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, price, categoryId } = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: parseFloat(price),
        category: { connect: { id: categoryId } },
      },
    });

    res.json(product);
  } catch (error) {
    console.error('💥 Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product.' });
  }
};

// DELETE /products/:id - Delete product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.product.delete({
      where: { id },
    });

    res.json({ message: 'Product deleted successfully.' });
  } catch (error) {
    console.error('💥 Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product.' });
  }
};
