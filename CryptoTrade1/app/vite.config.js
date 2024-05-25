// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from "path";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   define: {
//     'process': {
//       env: {
//         NODE_DEBUG: false
//       }
//     },
//     global: {},
    
//   },
//   resolve: { alias: { web3: path.resolve(__dirname, './node_modules/web3/dist/web3.min.js') }, }
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process': {
      env: {
        NODE_DEBUG: false
      }
    },
    global: {},
    
  },
  resolve: {
    alias: {
      web3: path.resolve(__dirname, './node_modules/web3/dist/web3.min.js'),
      'react-router-dom': path.resolve(__dirname, './node_modules/react-router-dom'),
    },
  },
})
