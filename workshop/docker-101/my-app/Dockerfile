FROM node:11 as build
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
RUN ng build

FROM nginx
ADD default.conf /etc/nginx/conf.d/default.conf
COPY --from=build  /home/app/dist/my-app /usr/share/nginx/html
EXPOSE 80