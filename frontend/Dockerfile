# pull from node 16 image
FROM node:16

# set the working directory
WORKDIR /book-finder/frontend

# add to path
ENV PATH /book-finder/frontend/node_modules/.bin:$PATH

# install app dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# add the app
COPY . .

# start it
CMD ["npm", "start"]

# docker run -itd --rm -v ${PWD}:/book-finder -v /book-finder/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true sample:dev