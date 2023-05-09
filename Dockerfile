FROM node:alpine
WORKDIR /app
COPY . /app
RUN npm install
COPY nodejswebapp.js .
EXPOSE 8080
CMD [ "node", "nodejswebapp.js" ]
