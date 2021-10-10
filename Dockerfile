# develop stage
#FROM node:lts-alpine3.14 as develop-stage
#WORKDIR /app
#COPY package*.json ./
#RUN npm install
#COPY . .

# build stage
#FROM develop-stage as build-stage
#RUN npm run build

# production stage
FROM nginx as production-stage
COPY ./dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
