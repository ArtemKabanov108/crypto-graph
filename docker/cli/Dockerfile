FROM node:14.17.2
WORKDIR /var/www/http/client
COPY . .
RUN apt-get update -y && apt-get upgrade -y && apt-get install bash-completion -y
RUN npm install
CMD ["npm", "start"]