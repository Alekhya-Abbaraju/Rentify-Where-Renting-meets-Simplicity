const asyncHandler = require('express-async-handler');
const Property = require('../models/Property');

// Get all properties
const getProperties = asyncHandler(async (req, res) => {
    const properties = await Property.find();
    res.status(200).json(properties);
});

// Get property by ID
const getProperty = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id);
    if (property) {
        res.status(200).json(property);
    } else {
        res.status(404).json({ message: 'Property not found' });
    }
});

// Create new property
const createProperty = asyncHandler(async (req, res) => {
    const { name, description, price, location } = req.body;
    const property = new Property({ name, description, price, location });
    const createdProperty = await property.save();
    res.status(201).json(createdProperty);
});

// Update property
const updateProperty = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id);
    if (property) {
        property.name = req.body.name || property.name;
        property.description = req.body.description || property.description;
        property.price = req.body.price || property.price;
        property.location = req.body.location || property.location;
        const updatedProperty = await property.save();
        res.status(200).json(updatedProperty);
    } else {
        res.status(404).json({ message: 'Property not found' });
    }
});

// Delete property
const deleteProperty = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id);
    if (property) {
        await property.remove();
        res.status(200).json({ message: 'Property removed' });
    } else {
        res.status(404).json({ message: 'Property not found' });
    }
});

module.exports = {
    getProperties,
    getProperty,
    createProperty,
    updateProperty,
    deleteProperty,
};
