// // import { defineConfig } from 'vite';
// import tailwindcss from '@tailwindcss/vite';

// // export default defineConfig({
// //   plugins: [tailwindcss()],
// //   server: {
// //     watch: {
// //       ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**'], // ignore noisy folders
// //       usePolling: false, // try to avoid polling (especially if not on WSL/Docker)
// //     },
// //   },
// // });


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import tailwindcss from '@tailwindcss/vite';

// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   server: {
//     watch: {
//       ignored: [
//         '**/node_modules/**',
//         '**/.git/**',
//         '**/dist/**',
//         '**/*.tmp',
//         '**/*.swp',
//         '**/*.swx',
//         '**/*~',
//         '**/.vscode/**',
//         '**/.idea/**',
//       ],
//       usePolling: false,
//     },
//   },
// });




import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
 import tailwindcss from '@tailwindcss/vite';


export default defineConfig({
   plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      // "@task-manager": path.resolve(__dirname, "./src/app/modules/task-manager"),
      // "@notification": path.resolve(__dirname, "./src/app/modules/notification"),
    },
  },
});



