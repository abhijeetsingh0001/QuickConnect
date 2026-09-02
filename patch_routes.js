const fs = require('fs');
let code = fs.readFileSync('Backend/routes/userRoute.js', 'utf8');

code = code.replace(
  'router.route("/logout").get(logout);',
  'router.route("/logout").get(isAuthenticated, logout);'
);

fs.writeFileSync('Backend/routes/userRoute.js', code);
