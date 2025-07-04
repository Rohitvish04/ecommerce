const prisma = require('../models/prismaClient');

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
  include: { category: true }
});
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong while fetching categories.' });
  }
};

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Category name is required' });

    const category = await prisma.category.create({
      data: { name },
    });

    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create category.' });
  }
};
