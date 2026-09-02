const fs = require('fs');
let code = fs.readFileSync('frontend/src/components/OtherUser.jsx', 'utf8');

code = code.replace(
  "        </div>\n        </div>\n      </div>\n      <div className='divider my-0 py-0 h-2'></div>\n    </>\n  )\n}",
  "        </div>\n      </div>\n      <div className='divider my-0 py-0 h-2'></div>\n    </>\n  )\n}"
);

fs.writeFileSync('frontend/src/components/OtherUser.jsx', code);
