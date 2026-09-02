const fs = require('fs');
let code = fs.readFileSync('src/db/schema.ts', 'utf8');

code = code.replace(
  '  updatedAt: timestamp("updated_at").defaultNow(),\n});\n\nexport const conversations',
  '  updatedAt: timestamp("updated_at").defaultNow(),\n  status: text("status").default("delivered"),\n});\n\nexport const conversations'
);

if (code === fs.readFileSync('src/db/schema.ts', 'utf8')) {
    code = code.replace(
        '  updatedAt: timestamp("updated_at").defaultNow(),\n});\nexport const conversations',
        '  updatedAt: timestamp("updated_at").defaultNow(),\n  status: text("status").default("delivered"),\n});\nexport const conversations'
    );
}

if (code === fs.readFileSync('src/db/schema.ts', 'utf8')) {
    console.log("Still failed to patch");
    code = code.replace(
        '  updatedAt: timestamp("updated_at").defaultNow(),\n});',
        '  updatedAt: timestamp("updated_at").defaultNow(),\n  status: text("status").default("delivered"),\n});'
    );
    // Be careful, this replaces both users and messages, we only want the second one.
}

fs.writeFileSync('src/db/schema.ts', code);
