# 🥊 KO Glove Studio

**KO Glove Studio** is a fully interactive glove customization and purchasing experience. Designed to let users create personalized boxing gloves with their own color schemes, decals, and names — then bring them to life with a direct-to-checkout flow.

---

## ✅ Features Implemented

### 🎨 Glove Customization
- Interactive 3D glove model using `@react-three/fiber` and `@react-three/drei`
- Color picker UI to change the base glove color
- Decal support:
  - Upload custom decals (PNG, JPG, WebP)
  - Select from preloaded options
- Hover effects & animations for decal previews
- Real-time 3D preview updates

### 👤 User Personalization
- User-specific glove designs stored in the database
- Designs include:
  - Base color
  - Uploaded/system decals
  - Decal placement
  - Optional glove name/title

### 💽 Backend + Database (Prisma + PostgreSQL)
- `User`, `GloveDesign`, and `Decal` models with full relations
- Stores multiple designs per user
- Plans to support:
  - Multiple decals per glove
  - Full-wrap themes
  - MMA gloves

### 🛒 Square API Integration
- Integrated Square payment for purchasing custom gloves
- Secure and seamless payment flow
- Hooking up user’s design directly to checkout session

### 🌐 Deployment
- Frontend: **Next.js 15 + React**
- Database: **PostgreSQL via Prisma**
- Hosted on **Vercel** with CI/CD pipeline

---

## 🛠 In Progress / Up Next

- 🔁 Rotate / scale / position decals (drag-and-drop tools)
- 🖼 Bump/normal map support for texture realism
- 🎨 Custom decal packs and full-glove wrap themes
- 👤 User profiles with saved glove collections
- 🔗 Shareable preview links (render-based)
- 📦 Product stock/inventory management for physical inventory

---

## 🧪 Developer Notes

- Fixed hydration/render bugs with React 18 + R3F
- Created tabbed layout system for customization features
- Resolved image loading issues (e.g., `.webp` not found)
- No Tailwind — all styles built in **custom CSS**
- Accessibility features being added (keyboard tab support)

---

## 🚀 Live Demo
**Coming soon** – stay tuned for the Vercel live deployment link.

---

## 👥 Team
- **Lead Developer / Full-Stack Engineer:** Dylan Lafferty

---

