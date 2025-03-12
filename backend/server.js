require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ルーティングの読み込み
const wordRoutes = require('./routes/wordRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const requestRoutes = require('./routes/requestRoutes');
const typeRoutes = require('./routes/typeRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/notion-word', wordRoutes);
app.use('/notion-category', categoryRoutes);
app.use('/notion-request-word', requestRoutes);
app.use('/notion-type', typeRoutes);
app.use('/notion-announcement', announcementRoutes);
app.use('/notion-auth', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
