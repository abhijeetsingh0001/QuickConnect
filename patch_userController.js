const fs = require('fs');
let code = fs.readFileSync('Backend/controllers/userController.js', 'utf8');

code = code.replace(
  'export const logout = (req, res, next) => {',
  `export const logout = async (req, res, next) => {
  try {
    if (req.id) {
      await db.update(users).set({ lastActive: new Date() }).where(eq(users.id, req.id));
    }`
);

code = code.replace(
  '      updatedAt: users.updatedAt\n    }).from(users).where(ne(users.id, loggedInUserId));',
  '      updatedAt: users.updatedAt,\n      lastActive: users.lastActive\n    }).from(users).where(ne(users.id, loggedInUserId));'
);

fs.writeFileSync('Backend/controllers/userController.js', code);
