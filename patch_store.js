const fs = require('fs');
let code = fs.readFileSync('frontend/src/redux/store.js', 'utf8');

code = code.replace(
  'import socketReducer from "./socketSlice.js";',
  'import socketReducer from "./socketSlice.js";\nimport themeReducer from "./themeSlice.js";'
);

code = code.replace(
  'socket:socketReducer\n })',
  'socket:socketReducer,\n    theme: themeReducer\n })'
);

fs.writeFileSync('frontend/src/redux/store.js', code);
