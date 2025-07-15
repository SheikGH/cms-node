require('dotenv').config(); // Load env vars

const app = require('./app');

const PORT = process.env.PORT | 7067;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});