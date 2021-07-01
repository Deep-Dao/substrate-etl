FROM node:14.15.0-alpine

WORKDIR /node_watcher

# To make the build fast
COPY package.json .
COPY yarn.lock .

# Install dependencies
RUN yarn

COPY ./ ./

# Create the database schema
CMD ["yarn", "start"]
