FROM node:11 AS build
ARG version=1.0.0
LABEL NAME="DEMO-WEB BUILD IMAGE"
LABEL CLI-VERSION="8.3.2"
RUN useradd --user-group --create-home --shell /bin/false app
ENV HOME=/home/app
WORKDIR $HOME
RUN apt-get update
RUN npm install -g @angular/cli \
    && npm install @angular/compiler-cli --save \
    && npm install yarn
COPY package.json package.json
RUN yarn install
COPY . .
RUN ng build --configuration=beta

FROM nginx
ADD default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /home/app/dist/DemoWeb /usr/share/nginx/html
EXPOSE 80
