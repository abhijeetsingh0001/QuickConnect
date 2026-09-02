const fs = require('fs');
let code = fs.readFileSync('frontend/src/components/Message.jsx', 'utf8');

code = code.replace(
  /{message\?\.status === 'read' \? \([\s\S]*?\)\}                    <\/span>/m,
  `{message?.status === 'read' ? (
                                <BsCheck2All className="text-blue-500 w-4 h-4" />
                            ) : message?.status === 'delivered' ? (
                                <BsCheck2All className="text-gray-400 w-4 h-4" />
                            ) : (
                                <BsCheck2 className="text-gray-400 w-4 h-4" />
                            )}
                    </span>`
);
fs.writeFileSync('frontend/src/components/Message.jsx', code);
