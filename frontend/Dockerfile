
# Utilisez une image Node.js officielle
FROM node:20-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./
COPY next.config.js ./

# Installer les dépendances
RUN npm ci

# Copier le code source
COPY . .

# Construire l'application
RUN npm run build

# Étape de production avec une image plus légère
FROM node:20-alpine AS runner

WORKDIR /app

# Définir les variables d'environnement pour Next.js
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOST=0.0.0.0
ENV PORT=3000

# Copier les fichiers nécessaires depuis l'étape de construction
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Exposer le port
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "run", "dev"]