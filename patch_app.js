const fs = require('fs');
let code = fs.readFileSync('frontend/src/App.js', 'utf8');

code = code.replace(
  '  const {socket} = useSelector(store=>store.socket);',
  '  const {socket} = useSelector(store=>store.socket);\n  const {mode} = useSelector(store=>store.theme);'
);

code = code.replace(
  '  useEffect(()=>{',
  `  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [mode]);

  useEffect(()=>{`
);

fs.writeFileSync('frontend/src/App.js', code);
