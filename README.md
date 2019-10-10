[![Build Status](https://dev.azure.com/leeroyashworthsa/DevOps-Presentation/_apis/build/status/leeroya.DevOps-Presentation?branchName=master)](https://dev.azure.com/leeroyashworthsa/DevOps-Presentation/_build/latest?definitionId=1&branchName=master)

# DevOps Presentation

This is a presentation repo for building and releasing software using containers.

Developer Operations is a way of thinking that has gained traction and is forcing developers and operational engineers to perform different tasks in the work place, and drive innovation and automation.

This repository is authored in a way from a developers point of view with the concepts in mind of what operational engineer may perform. The idea is to show containers and how they can solve certain build and deploy problems.

# Prerequisite's 

- Docker desktop installed for Windows and Linux [physical developer machine]
- VSCode installed [or similar code/text editor]
- [dotnet core](https://dotnet.microsoft.com/download)
- angular 
    - [nodejs](https://nodejs.org/en/download/)
    - [angular cli](https://angular.io/cli)
    - build tools: [ npm install --global --production windows-build-tools ]
    - Sass: [ npm install -g node-sass ]
    - [yarn](https://yarnpkg.com/)

# Objectives

# [Docker Concepts](workshop/docker-101/README.md)

- What are containers and how do they differ from other technologies
- Docker Desktop
- Dockerfile
- Docker commands
- Maintenance of a system running the Docker engine
- Docker licensing model
- New features and some advanced concepts
- Windows & Linux Containers
    - What is the difference between Windows and Linux aside from the Operating System
    - Performance differences between Linux and Windows
    - When to use OS specific vs Cross platform
    - Hybrid platforms mixing containers with shared resources. [Shared Database with API in a container]
 

# Building and running apps in containers

BuildKit and how to author the Dockerfile
- Docker run commands and Docker-Compose
Basics in orchestration , Docker Swarm and compose including Kubernetes 101

What is swarm and when to use it
Docker-Compose with swam
What is Kubernetes
Swarm vs Kubernetes
Docker Desktop and Kubernetes
Kubernetes Tools
Pipelines with containers

When should you put your build in a container
How to put your build into a container
Benefits of containerized builds

- Docker 101
- Docker-Compose
- using Docker as a developer
    - debug in a container [vscode]
- using Docker as a build engineer
    - build your code then create artifacts
- using Docker as a deployment engineer
    - run containers
- Kubernetes 101
    - using kubernetes as a developer
    - deploying kubernetes applications

## Useful Links

- [Microsoft on Docker Hub](https://hub.docker.com/u/microsoft)
- [Docker: Deploy on Kubernetes](https://docs.docker.com/docker-for-windows/kubernetes/)

## Docker 101

- [Docker 101 Workshop](workshop/docker-101/README.md)

## Docker-Compose

- [docker-compose](workshop/docker-compose/README.md)

## Docker as a developer

- [debug in a container](workshop/debug-in-container/README.md)

## Docker as a build engineer

- [build your code then create artifacts](workshop/nuget-package/README.md)

## Docker as a deployment engineer

- [run containers](workshop/deployments/README.md)

## Kubernetes 101

- [run containers](workshop/deployments/README.md)