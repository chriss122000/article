FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# CMD ["npm", "run", "start:prod"]
CMD ["npm", "run", "start:dev"]
EXPOSE 3000