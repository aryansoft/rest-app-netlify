const User = require('./user');
const Role = require('./role');
const UserRole = require('./userRole');

// Define many-to-many association
User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

module.exports = { User, Role, UserRole };
