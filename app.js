const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('../config/database');
const { User, Role, UserRole } = require('../models');
const checkRole = require('../middleware/checkrole');

const app = express();
app.use(bodyParser.json());

// Sync the database
sequelize.sync({ force: true }).then(async () => {
  console.log('Database synced!');

  // Create mock data
  const [adminRole, userRole] = await Role.bulkCreate([{ name: 'Admin' }, { name: 'User' }]);
  const user = await User.create({ name: 'John Doe', email: 'john@example.com' });

  // Assign roles to the user
  await user.addRole(adminRole);
  await user.addRole(userRole);
});

// User Routes
app.get('/users', async (req, res) => {
  const users = await User.findAll({ include: Role });
  res.json(users);
});

// Role Routes
app.get('/roles', async (req, res) => {
  const roles = await Role.findAll({ include: User });
  res.json(roles);
});

app.get('/admin', checkRole('Admin'), async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//const PORT = process.env.PORT || 3001;
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
