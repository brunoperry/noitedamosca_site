#FROM alpine
FROM arm64v8/alpine

RUN apk --no-cache add --virtual builds-deps build-base python3
RUN apk --no-cache add --update npm

# Setup project structure
COPY public /app/public
COPY views /app/views
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY server.js /app/server.js
WORKDIR /app

# Build project code (in the image itself)
RUN npm ci

EXPOSE 80

# Run app
CMD npm run prod
