FROM node:16 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#FROM nginx:alpine
#COPY --from=build /app/build /usr/share/nginx/html

CMD ["npm", "start"]

EXPOSE 3001