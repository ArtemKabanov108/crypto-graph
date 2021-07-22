FROM node:14.17.2
WORKDIR /var/www/http/server
COPY . .
RUN apt-get update -y && apt-get upgrade -y && apt-get install bash-completion -y
RUN npm install
CMD ["npm", "run", "start:dev"]