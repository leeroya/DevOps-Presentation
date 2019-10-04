


Easily connect multiple services together
Docker Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration. Docker Compose installs automatically with Docker Desktop.

A multi-container app is an app that has multiple containers running and communicating with each other. This sample uses a simple .Net Core web app running with a MySQL database. You can check out the app in our dockersamples GitHub repo. We’ve pushed two images to the Docker Hub under the dockersamples repo. Docker Compose handles service discovery directly, allowing the app to reference the service directly and Docker will route traffic to the right container. To try it out, open a text editor and paste the text from this file. Then save it as docker-compose.yml.

There’s a lot of details in there but basically you can see that it specifies the images to be used, the service names, application configuration, the ports available, and networks the different services are on.

To run it, open a command line and navigate to the same directory as the docker-compose.yml file. At the command line, type

docker-compose up -d
You will see a bunch of commands go by as it pulls images from Docker Hub and then starts them up. When it has finished running, navigate to http://localhost. You should see a music album viewer. The .NET Core application saves data in the MySQL database - you don’t need .NET Core or MySQL installed, all the components are running in Docker.

To stop and remove all services and resources created by Docker Compose:

docker-compose down