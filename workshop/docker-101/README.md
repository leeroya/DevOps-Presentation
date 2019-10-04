# Docker 101

In this folder [workshop/docker-101] you will find:

- index.html
- Dockerfile
- .dockerignore

## File explanation

``Dockerfile`` this is the instruction file that is used to create a image, it has a list of instructions that is passed to the Docker cli when performing the: ``docker build`` command. 

``index.html`` is the custom webpage that will be used to show that the image created has the changes by running the container.

``.dockerignore`` this is a file that is used to ignore files from the Docker runtime when building to improve performance.

## Breakdown of the basic commands

    [application] [action] [options] [image] [program in the container]

``Example of this``

    [docker] [run] [--name] (nanoiis) [mcr.microsoft.com/dotnet/framework/sdk] (pwsh -c "Write-Host 'Hello World' ")

## Lab 1

Switching between Linux and Windows is done by right clicking on the whale icon in your system tray and selecting the ``Switch to Windows containers`` or ``Switch to Linux containers`` options in the menu.

## Intention 

Run our first windows container.

Open powershell as administrator and run the following:

    docker run --name nanoiis -d -p 80:80 nanoserver/iis

Open your browser and you will see the default IIS page when navigating to http://localhost.

### Breakdown

``--name`` was passed to give the container a name so that it is easier to identify. ``-d`` passes the flag to the runtime to detach your console from the console in the container. ``-p`` performs a port binding from the host ``on the left`` to the container ``on the right``.


This can be done in Linux just as easy by running a Nginx web server, switch your Docker context in the menu of the tray icon and run:

    docker run --name nginx -d -p 80:80 nginx

``NOTE:`` 

Notice that the port binding is the same, that is because Windows containers target the Windows kernel where as Linux targets a virtual machine that has Linux running in it.

## Lab 2

Ensure that your Docker context is running in the Windows containers mode.

## Intention 

Inspect a container to get some information from it.

### Step 1

Open PowerShell and run the following:

    docker run --name nanoiisinspect -d -it -p 80:80 nanoserver/iis

### Step 2

To have a list of running containers you can run:

    docker ps

or:

    docker container ls

or:

    docker ps -a -f status=running

### Step 3

Next lets get the IPAddress of the container, for that we use the -f / --format flag to extract metadata of the container.

Run in a elevated PowerShell terminal:

    docker inspect -f "{{ .NetworkSettings.Networks.nat.IPAddress }}" nanoiisinspect

### Step 4

Next lets filter to get just the id of the container:

    docker inspect --format="{{.Id}}" nanoiisinspect

## Lab 3

### Intention

The purpose of this lab is to demonstrate that it is possible to interact with a container that is created.

### Step 1

Run in a elevated PowerShell terminal:

    docker run --name nanoiiscopy -d -it -p 8080:80 nanoserver/iis

Check that the container was created and is running by navigating to ``http://localhost:8080`` and by running ``docker ps`` and seeing the container listed ``nanoisscopy``.

Next run the command to stop the container:

    docker stop nanoiiscopy

This is to allow us to copy a file to IIS in the container, next run:

    docker container cp .\index.html nanoiiscopy:C:\inetpub\wwwroot\index.html


``NOTE:``

The command above needs to be run the folder [workshop/docker-101] as the .\index.html indicates from ``[current directory]\index.html``. 

The custom index file has been copied to the container, next the container can be started by running:

    docker start nanoiiscopy

Open your browser to ``http://localhost:8080`` and you will see now the custom webpage has replaced the standard IIS webpage.

## Lab 4

### Intention

The purpose of this lab is to demonstrate the build command which is commonly used to create application images for consuming in a production environment.

### Step 1

The Lab 3 process can be achieved by using a Dockerfile. In the docker-101 folder run the following command:

    docker build -t iis .

### Breakdown

``docker`` targeting the Docker cli to invoke methods exposed.

``build`` the compile command in the Docker cli to create image repositories.

``-t`` this flag is used to give your image repository a logical name, in this example the image repository name iis is given with no tag so the cli will append ``latest``, it is best practice to version your image repositories by example ``iis:1``.

``.`` , this is the build context where the cli will begin looking for files, in this example it is the current directory.

### Step 2

Next the image needs to be run, simply run the command:

    docker run -d -p 8081:80 iis

Navigate to in your browser ``http://localhost:8081`` and you will see the custom page.

## Overview

In this section we were introduced to the Docker cli and ran a IIS container, changed the loading page, and built a custom image that can be run later on a different machine.

## House cleaning

It would be good to clean up containers that are not required, to clean up it is possible to run:

    docker rm $(docker ps --format="{{.ID}}") -f

