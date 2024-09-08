# step 1 to build src 
FROM node:20 as build-step
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install
RUN npm i sass --save-dev
RUN pwd
RUN npm run build

# step 2 nginx to serve

FROM docker.io/library/nginx:latest

RUN chgrp -R 0 /var/cache/ /var/log/ /var/run/ && \
    chmod -R g=u /var/cache/ /var/log/ /var/run/
    
RUN ls -l /var/run
RUN touch /var/run/nginx.pid
RUN ls -l /var/run/
RUN chmod g+rwx /var/run/nginx.pid
RUN mkdir -p /var/cache/nginx/client_temp
RUN ls -l /var/run/
RUN echo $USER
RUN whoami


COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /app/dist /usr/share/nginx/html

# EXPOSE 3000
EXPOSE 80


ENTRYPOINT ["nginx", "-g", "daemon off;"]