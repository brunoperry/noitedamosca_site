# Use the Alpine Linux base image
FROM arm64v8/alpine
#FROM alpine:latest

RUN apk update && \
    apk add --no-cache nginx

COPY nginx.conf /etc/nginx/nginx.conf

COPY icon.jpeg /usr/share/nginx/html/
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
