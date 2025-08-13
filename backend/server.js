const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models');

const app = express();
const PORT = 3000;

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

// Test route
app.get('/', (req, res) => res.send('✅ Backend is running'));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));

db.sequelize.authenticate()
  .then(() => {
    console.log('✅ DB connected');
    return db.sequelize.sync();
  })
  .then(() => {
    console.log('✅ Database synced');
    app.listen(PORT, () => {
      console.log(` Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(' DB Connection or Sync Failed:', err);
  });

process.on('unhandledRejection', (reason, promise) => {
  console.error(' Unhandled Promise Rejection:', reason);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error(' Uncaught Exception:', err);
  process.exit(1);
});
