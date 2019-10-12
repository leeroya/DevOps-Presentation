# Docker-Compose


Easily connect multiple services together
Docker Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration. Docker Compose installs automatically with Docker Desktop.
A multi-container app is an app that has multiple containers running and communicating with each other.

In this folder [workshop/docker-compose] you will find:

- api
    - Dockerfile
- web
    - Dockerfile
- .env
- docker-compose.yml

## File explanation

``api`` this is the folder of the demo dotnet core web api that will be used to demonstrate the docker compilation. 

``web`` this is the folder that has a basic angular application that will be used to demonstrate the docker compilation.

``.env`` this is a file that holds environment variables that can be consumed by the docker runtime.

``docker-compose.yml`` this is the instructions file that will manage the containers that are equired.

## Breakdown of the basic commands

Bring up the services by running this command in the folder ``[workshop/docker-compose]``:

    docker-compose up -d

Once the required images are pulled down and the compilation is complete point the browser to ``http://localhost:8080`` and you will see the application running. The application makes a API call to the backend to retrieve data from the database.

To stop everything simply run:

    docker-compose down

## Breakdown of the docker-compose

Target the version of compose that you would like to use by specifying the version at the top of the file:

    version: '3.2'

The overview outline:

The services attribute highlights the applications that will be run in this deployment. In this case we have a database [db], a dotnet core api [api] and a angular webapp [web].

    services:
        db:
        api:
        web:

Specify the ports that are required this is similar to the -p 3306:4000 flag that was used in the docker 101 session:

    ports:
      - "3306:4000"

In the use case where a code compilation is required it the build attritute can be used to instruct the docker runtime to run the build command first then run the execution commands to create the container:

    build:
      context: ./web
      dockerfile: Dockerfile

When compilation is not needed then the image attribute can be used to run a pre-compiled application:

    image: dockersamples/tidb:nanoserver-1809

There are cases when one application requires another application to be running before it can be executed, examples of this are data stores and server code, in this example the [db] service needs to be functional prior to the [api]:

    depends_on:
      - db

Give your service container a name by using the container_name attribute:

    container_name: awesome-api

Create a network for your services:

    networks:
      default:
        external:
          name: nat

For [More Info](https://docs.docker.com/compose/compose-file/) go to the docker website to view updated attributes.

Lab 1

    docker-compose up -d


Lab 2

    docker-compose run web db




