import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/", // ถ้าจะลง Vercel ใช้แบบนี้ ถ้าจะลง GitHub Pages ให้เปลี่ยนเป็น "/ชื่อrepo/"
})
