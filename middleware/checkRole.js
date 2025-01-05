const { User, Role } = require('../models');

const checkRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const userId = 1; // Assuming user ID is extracted from a JWT token
      const user = await User.findByPk(userId, {
        include: {
          model: Role,
          through: { attributes: [] }, // Include roles without join table attributes
        },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if user has the required role
      const hasRole = user.Roles.some((role) => role.name === requiredRole);

      if (!hasRole) {
        return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
      }

      next(); // User has the required role, proceed to the next middleware or controller
    } catch (error) {
      console.error('Error in checkRole middleware:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};

module.exports = checkRole;