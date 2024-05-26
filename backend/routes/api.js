// routes/api.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const propertyController = require('../controllers/propertyController');

// Seller endpoints
router.get('/properties', authMiddleware.authenticateUser, propertyController.getPropertiesBySeller);
router.put('/properties/:id', authMiddleware.authenticateUser, propertyController.updateProperty);
router.delete('/properties/:id', authMiddleware.authenticateUser, propertyController.deleteProperty);

// Buyer endpoints
router.get('/properties', propertyController.getAllProperties);
router.post('/interest', propertyController.recordInterest);

// Filter endpoint
router.get('/properties/filter', propertyController.filterProperties);

module.exports = router;
