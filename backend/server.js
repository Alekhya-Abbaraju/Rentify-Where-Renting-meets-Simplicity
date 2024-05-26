const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

app.use('/api', authRoutes);
app.use('/api/properties', propertyRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
