const fs = require('fs');
let code = fs.readFileSync('frontend/src/components/OtherUser.jsx', 'utf8');

const regex = /<p className='text-xs text-gray-500 dark:text-gray-400'>\{lastActiveText\}<\/p>\n        <\/div>\n        <\/div>\n      <\/div>/g;
code = code.replace(regex, `<p className='text-xs text-gray-500 dark:text-gray-400'>{lastActiveText}</p>\n        </div>\n      </div>`);

fs.writeFileSync('frontend/src/components/OtherUser.jsx', code);
