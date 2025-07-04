const prisma = require('../models/prismaClient');

// GET /categories - Fetch all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    console.error('💥 Error fetching categories:', error);
    res.status(500).json({ error: 'Something went wrong while fetching categories.' });
  }
};

// POST /categories - Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Category name is required.' });

    const newCategory = await prisma.category.create({
      data: { name },
    });

    res.status(201).json(newCategory);
  } catch (error) {
    console.error('💥 Error creating category:', error);
    res.status(500).json({ error: 'Failed to create category.' });
  }
};
