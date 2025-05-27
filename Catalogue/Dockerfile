# Establecer una imagen base
FROM node:latest

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
#RUN npm install
#RUN npm install --legacy-peer-deps


RUN npm install @mui/material @emotion/react @emotion/styled --force
#RUN npm install -g npm@11.0.0

# Copiar el resto del código de la aplicación
COPY . .

# Construir la aplicación Next.js para producción
#RUN npm run dev
#RUN npm run dev

# Exponer el puerto que usará el contenedor
#EXPOSE 3000

# Iniciar la aplicación
CMD ["npm", "run", "dev"]
