import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bộ màu thương hiệu bạn đã chọn
        brand: {
          blue: '#4385BB',   // Xanh dương đậm (Màu chính)
          orange: '#F54D00', // Cam tươi (Màu nhấn)
          yellow: '#FFC107', // Vàng (Sao đánh giá)
          gray: '#FDFDF4',   // (Nền web)
        }
      },
    },
  },
  plugins: [],
};
export default config;