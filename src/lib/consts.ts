export const SUGGESTIONS = [
  'Create ToDo App in React',
  'Create Budget Track App',
  'Create Gym Managment Portal Dashboard',
  'Create Quizz App On History',
  'Create Login Signup Screen',
];

export const DEPENDENCIES = {
  postcss: '^8',
  tailwindcss: '^3.4.1',
  autoprefixer: '^10.0.0',
  uuid4: '^2.0.3',
  'tailwind-merge': '^2.4.0',
  'tailwindcss-animate': '^1.0.7',
  'lucide-react': '^0.469.0',
  'react-router-dom': '^7.1.1',
  'date-fns': '^4.1.0',
  'react-chartjs-2': '^5.3.0',
  'chart.js': '^4.4.7',
};

export const DEFAULT_FILES = {
  '/public/index.html': {
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div id="root"></div>
</body>
</html>`,
  },
  '/src/App.tsx': {
    code: `import React from 'react';

function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Hello, Tailwind React!</h1>
    </div>
  );
}

export default App;`,
    active: true,
  },
  '/src/index.tsx': {
    code: `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  },
  '/src/index.css': {
    code: `@tailwind base;
@tailwind components;
@tailwind utilities;`,
  },
  '/tailwind.config.ts': {
    code: `import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;`,
  },
  '/postcss.config.ts': {
    code: `import type { Config } from 'postcss-load-config';

const config: Config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;`,
  },
  '/package.json': {
    code: JSON.stringify(
      {
        dependencies: {
          react: '^18.2.0',
          'react-dom': '^18.2.0',
          tailwindcss: '^3.3.0',
          postcss: '^8.4.0',
          autoprefixer: '^10.4.0',
        },
        devDependencies: {
          '@types/react': '^18.0.0',
          '@types/react-dom': '^18.0.0',
          typescript: '^4.9.5',
        },
        scripts: {
          start: 'react-scripts start',
          build: 'react-scripts build',
        },
      },
      null,
      2
    ),
  },
  '/tsconfig.json': {
    code: JSON.stringify(
      {
        compilerOptions: {
          target: 'es5',
          lib: ['dom', 'dom.iterable', 'esnext'],
          allowJs: true,
          skipLibCheck: true,
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          strict: true,
          forceConsistentCasingInFileNames: true,
          module: 'esnext',
          moduleResolution: 'node',
          resolveJsonModule: true,
          isolatedModules: true,
          noEmit: true,
          jsx: 'react-jsx',
        },
        include: ['src'],
      },
      null,
      2
    ),
  },
};
