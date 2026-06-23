![logo wikidotexe](https://github.com/user-attachments/assets/da82fc30-1dbe-48bf-b57c-033dec2ceb9d)

# 🚀 Portfolio Pro - Unified V2

[![GitHub Stars](https://img.shields.io/github/stars/wikidotexe/Portfolio-modern?style=social)](https://github.com/wikidotexe/Portfolio-modern/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/wikidotexe/Portfolio-modern?style=social)](https://github.com/wikidotexe/Portfolio-modern/network)
[![Build & Deploy](https://github.com/wikidotexe/PortfolioApp/actions/workflows/main.yml/badge.svg)](https://github.com/wikidotexe/PortfolioApp/actions)

This is a **Full-Stack Portfolio Application** featuring a powerful **Laravel 11** backend and a stunning **Next.js 15** frontend enhanced with **Framer Motion** and **Motion/React** animations.

> **Project Status**: 🧠 Actively Developed & Fully Automated via CI/CD

---

## 🔍 **Core Features**

- 🎨 **Modern & Fluid Design** Built with **Next.js 15**, **Tailwind CSS**, and **Shadcn UI**.
- 🚀 **Automated CI/CD** Zero-downtime deployment to Synology NAS via GitHub Actions & Docker.
- ✨ **High-Performance Animations** Standardized `motion/react` (Framer Motion) implementations for a "snappy" and premium feel.
- 🖼️ **Optimized Media** Bypass-optimized image loading for robust performance across different network environments.
- 🛡️ **API Security** Restricted direct browser access to API endpoints (404 for non-JSON requests).
- 🛠️ **Powerful Admin Dashboard** Manage projects, skills, and certificates via **Laravel Filament**.
- 🌗 **Intelligent Dark Mode** Seamless theme switching with persistent user preferences.
- � **Dockerized Stack** Production-ready containers for consistent environments.

---

## 📂 **Project Structure**

```bash
PortfolioApp/
├── .github/workflows/    # CI/CD Pipeline (GitHub Actions)
├── frontend/             # Next.js 15 Application
│   ├── components/       # Optimized UI Components
│   └── ...
├── backend/              # Laravel 11 API (Server)
│   ├── app/              # Business Logic & Middleware
│   └── ...
├── docker-compose.yml    # Combined Docker Orchestration
└── README.md
```

---

## 🛠️ **CI/CD Pipeline**

The project features a fully automated deployment pipeline:
1. **Push to Main**: Triggers GitHub Actions.
2. **Build**: Docker images for Frontend & Backend are built and pushed to **Docker Hub**.
3. **Deploy**: The pipeline SSHes into the **Synology Server**, pulls the latest images, and recreates containers (`--force-recreate`).

---

## ⚙️ **Installation & Setup**

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/wikidotexe/PortfolioApp.git
cd PortfolioApp
```

### 2️⃣ Docker Deployment (Recommended)
```bash
docker-compose up -d --build
```

---

## ✨ **Motion & Performance**

- **snappy.js**: Animation durations have been optimized to `0.3s` for a faster user experience.
- **Liquid Indicator**: Scroll-synced and hover-reactive navbar indicator.
- **Staggered Reveals**: Efficient layout animations for cards and timeline items.

---

## 🧑‍💻 **Contribution**

Contributions are welcome! Please follow the standard fork/PR workflow.

---

## 🌟 **Acknowledgments**

Thank you for visiting! If you find this project useful, please drop a ⭐!

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Happy coding & stay creative 💻✨
    