const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/properties
router.post('/', authMiddleware.authenticateUser, async (req, res) => {
  const { place, area, bedrooms, bathrooms, nearbyHospitals, nearbyColleges } = req.body;
  const seller = req.user._id;

  try {
    const property = await Property.create({
      place,
      area,
      bedrooms,
      bathrooms,
      nearbyHospitals,
      nearbyColleges,
      seller,
    });
    res.status(201).json(property);
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /api/properties/:id
router.delete('/:id', authMiddleware.authenticateUser, async (req, res) => {
  const propertyId = req.params.id;
  const userId = req.user._id;

  try {
    const property = await Property.findOne({ _id: propertyId, seller: userId });
    if (!property) {
      return res.status(404).json({ message: 'Property not found or you are not authorized to delete this property' });
    }
    await property.remove();
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
