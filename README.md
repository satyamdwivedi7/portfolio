# 🚀 Personal Portfolio  

This is my personal portfolio website built with **Next.js** and styled using **TailwindCSS**.  
It showcases my projects, skills, and experience in software development. The application is containerized using **Docker** for easy deployment and scalability.  

---

## 🛠️ Tech Stack  

- **Frontend Framework**: [Next.js](https://nextjs.org/)  
- **Styling**: [TailwindCSS](https://tailwindcss.com/)  
- **Containerization**: [Docker](https://www.docker.com/)  

---

## 📂 Features  

- Responsive and modern UI  
- Showcases projects and achievements  
- Optimized for performance and SEO  
- Deployed using Docker for portability  

---

## ⚙️ Installation & Setup 

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/satyamdwivedi7/portfolio.git
cd portfolio
```
### 2️⃣ Install Dependencies
```bash
npm install
# or
yarn install
```
### 3️⃣ Run the Development Server
```bash
npm run dev
# or
yarn dev
```
Now visit: http://localhost:3000


### 🐳 Run with Docker
### 1️⃣ Build the Docker Image
```bash
docker build -t portfolio-app .
```
### 2️⃣ Run the Container
```bash
docker run -p 3000:3000 portfolio-app
```