const fs = require('fs');
let code = fs.readFileSync('frontend/src/components/OtherUser.jsx', 'utf8');

code = code.replace(
  `        <div className='flex flex-col flex-1'>
          <div className='flex justify-between gap-2 '>
            <p>{user?.fullName}</p>
          </div>
          <p className='text-xs text-gray-500 dark:text-gray-400'>{lastActiveText}</p>
        </div>
        </div>
      </div>`,
  `        <div className='flex flex-col flex-1'>
          <div className='flex justify-between gap-2 '>
            <p>{user?.fullName}</p>
          </div>
          <p className='text-xs text-gray-500 dark:text-gray-400'>{lastActiveText}</p>
        </div>
      </div>`
);
fs.writeFileSync('frontend/src/components/OtherUser.jsx', code);
