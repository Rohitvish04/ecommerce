const prisma = require('../models/prismaClient');

// Get all products with optional filtering
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
      include: { category: true },
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    console.error("💥 Error in getAllProducts:", error);
    res.status(500).json({ error: 'Something went wrong while fetching products.' });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { category: true },
    });

    if (!product) return res.status(404).json({ error: 'Product not found.' });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch product.' });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId } = req.body;

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) return res.status(400).json({ error: 'Category not found.' });

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category: {
          connect: { id: categoryId },
        },
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, categoryId } = req.body;

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        price: parseFloat(price),
        category: { connect: { id: categoryId } },
      },
    });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Product deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to delete product.' });
  }
};
