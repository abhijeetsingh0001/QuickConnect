const fs = require('fs');
let code = fs.readFileSync('frontend/src/components/Sidebar.jsx', 'utf8');

code = code.replace(
  'import { setMessages } from \'../redux/messageSlice\';',
  'import { setMessages } from \'../redux/messageSlice\';\nimport { toggleTheme } from \'../redux/themeSlice\';\nimport { FiSun, FiMoon } from "react-icons/fi";'
);

code = code.replace(
  '    const {otherUsers} = useSelector(store=>store.user);',
  '    const {otherUsers} = useSelector(store=>store.user);\n    const {mode} = useSelector(store=>store.theme);'
);

const newFooter = `
            <div className='mt-2 flex items-center justify-between'>
                <button onClick={logoutHandler} className='btn btn-sm bg-white text-slate-800 hover:bg-slate-100 dark:bg-white dark:text-slate-800 dark:hover:bg-slate-100 border-none rounded-full px-8 shadow-sm hover:shadow-md transition-all duration-300 ease-out transform hover:-translate-y-0.5 font-medium tracking-wide'>Logout</button>
                <button onClick={() => dispatch(toggleTheme())} className="btn btn-sm btn-circle btn-ghost text-black dark:text-white">
                    {mode === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
                </button>
            </div>
        </div>
`;

code = code.replace(
  /<div className='mt-2'>\s*<button onClick=\{logoutHandler\}[\s\S]*?<\/button>\s*<\/div>\s*<\/div>/,
  newFooter
);

// Also need to fix search input class
code = code.replace(
  "className='input input-bordered rounded-md'",
  "className='input input-bordered rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white'"
);
// search button
code = code.replace(
  "className='btn bg-zinc-700 text-white'",
  "className='btn bg-gray-200 dark:bg-zinc-700 text-black dark:text-white border-none'"
);

fs.writeFileSync('frontend/src/components/Sidebar.jsx', code);
