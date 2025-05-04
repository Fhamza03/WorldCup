# 🏆 Fan ID Mondial 2030

Le projet **Fan ID Mondial 2030** est une plateforme numérique permettant aux supporters d'obtenir un **Fan ID** pour assister aux matchs de la Coupe du Monde 2030 au Maroc. Cette solution offre une gestion sécurisée de l'authentification et de l'autorisation, simplifiant l'accès aux stades grâce à des technologies modernes.

## 🌍 Fonctionnalités principales

- **Génération du Fan ID** : Identification unique pour chaque supporter.
- **Accès sécurisé** : Authentification avec Spring Security et JWT.
- **Gestion des utilisateurs** : Inscription et connexion des supporters.
- **Centralisation des services** :
  - 🚌 **Transport** : Options de déplacement en bus, tram ou covoiturage.
  - 🍽️ **Restauration** : Accès aux restaurants et options alimentaires proches des stades.
  - 🏨 **Hébergement** : Réservation d'hôtels et logements pour les visiteurs.
- **Tableau des issues** : Suivi des tâches et bugs avec GitHub Issues.
- **Intégration CI/CD** : Automatisation avec GitHub Actions.
- **Déploiement via Docker** : Conteneurisation du backend et frontend.

## 🛠️ Technologies utilisées

### Frontend :
- ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) Next.js (avec TypeScript) 
- Développé par : **Anas Aammari** et **Abdelmoughith Elaoumari**

### Backend :
- ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white) Spring Boot
- ![Spring Security](https://img.shields.io/badge/Spring%20Security-6DB33F?style=for-the-badge&logo=spring-security&logoColor=white) Spring Security
- ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=json-web-tokens&logoColor=white) JWT Authentication
- ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white) OpenAPI (Swagger) Documentation
- Développé par : **Hamza Fellah** et **Yahya Lemkharbech**

### Base de données :
- ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white) MySQL

### DevOps :
- ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) Git
- ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white) GitHub
- ![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white) GitHub Actions (CI/CD)
- ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) Docker

## 👥 Équipe de développement

- **👑 Hamza Fellah** – Propriétaire du dépôt, Développeur back-end
- **🛠️ Yahya Lemkharbech** – Développeur back-end
- **🎨 Anas Aammari** – Développeur front-end
- **💻 Abdelmoughith Elaoumari** – Développeur front-end
- **📚 Encadré par** : *Pr. Hiba Asri*

## 🚀 Installation et exécution du projet

### 1️⃣ Prérequis
- Docker
- Node.js
- Java 21
- MySQL

### 2️⃣ Cloner le dépôt
```bash
git clone https://github.com/Fhamza03/WorldCup.git
cd WorldCup
```

### 3️⃣ Démarrer les services définis avec Docker Compose
```bash
docker-compose up -d
```

### 4️⃣ Créer la base de données manuellement (si vous n'utilisez pas Docker pour MySQL)
```bash
mysql -u root -p
CREATE DATABASE Worldcup;
```

### 5️⃣ Démarrer le backend
```bash
cd backend
./mvnw spring-boot:run
```

### 6️⃣ Démarrer le frontend
```bash
cd frontend
npm install
npm run dev
```

### 7️⃣ Accéder à l'application
- **Backend** : `http://localhost:8080`
- **Frontend** : `http://localhost:3000`

## 📌 Contribuer
Les contributions sont les bienvenues ! Veuillez consulter les **issues** et les **pull requests** avant de proposer des changements.

---
© 2025 Fan ID Mondial 2030 – Tous droits réservés.
