FROM node:carbon-alpine 

# Create app directory

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
 

# Install app dependencies

#COPY package.json /usr/src/app/

# RUN npm config set strict-ssl false

# RUN npm config set registry "http://registry.npmjs.org/"

# RUN npm config set proxy http://10.101.3.148:3128/

# RUN npm config set https-proxy https://10.101.3.148:3128/



 

# Bundle app source

COPY . /usr/src/app
RUN npm install
RUN npm audit fix
RUN npm build newUI
EXPOSE 4200

CMD [ "npm", "start" ]

