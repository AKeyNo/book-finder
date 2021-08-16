# pull from node 16 image
FROM node:16

# set the working directory
WORKDIR /book-finder/backend

# add to path
ENV PATH /book-finder/backend/node_modules/.bin:$PATH

# install app dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# add the app
COPY . .

# start it
CMD ["node", "app"]