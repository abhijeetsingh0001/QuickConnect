const fs = require('fs');
let code = fs.readFileSync('Backend/controllers/userController.js', 'utf8');
const startIndex = code.indexOf('export const logout');
const endIndex = code.indexOf('export const getOtherUsers');
const replacement = `export const logout = async (req, res, next) => {
  try {
    if (req.id) {
      await db.update(users).set({ lastActive: new Date() }).where(eq(users.id, req.id));
    }
    return res.status(200).cookie("token", "", { maxAge: 0, sameSite: "none", secure: true }).json({ message: "Logout successfully" });
  } catch (error) {
    return next(error);
  }
}\n`;

code = code.substring(0, startIndex) + replacement + code.substring(endIndex);
fs.writeFileSync('Backend/controllers/userController.js', code);
