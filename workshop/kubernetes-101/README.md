
# Docker-Compose

Compose is a tool for defining and running multi-container Docker applications. 
With Compose, you use a YAML file to configure your application’s services. 
Then, with a single command, you create and start all the services from your configuration.

Compose works in all environments: production, staging, development, testing, as well as CI workflows. You can learn more about each case in Common Use Cases.

Using Compose is basically a three-step process:

1. Define your app’s environment with a Dockerfile so it can be reproduced anywhere.

2. Define the services that make up your app in docker-compose.yml so they can be run together in an isolated environment.

3. Run docker-compose up and Compose starts and runs your entire app.

A docker-compose.yml looks like this:

    version: '3'
    services:
    web:
        build: .
        ports:
        - "5000:5000"
        volumes:
        - .:/code
        - logvolume01:/var/log
        links:
        - redis
    redis:
        image: redis
    volumes:
    logvolume01: {}

For more information about the Compose file, see the [Compose file reference](https://docs.docker.com/compose/compose-file/).

Compose has commands for managing the whole lifecycle of your application:

- Start, stop, and rebuild services
- View the status of running services
- Stream the log output of running services
- Run a one-off command on a service

## Automated testing environments

An important part of any Continuous Deployment or Continuous Integration process is the automated test suite. Automated end-to-end testing requires an environment in which to run tests. Compose provides a convenient way to create and destroy isolated testing environments for your test suite. By defining the full environment in a Compose file, you can create and destroy these environments in just a few commands:

    docker-compose up -d
    ./run_tests
    docker-compose down

```Working in the folder: [checkout location]/workshop/kubernetes-101```

When you need to run the containers again you can run:

    docker-compose build

At times code is altered and you would like to rebuild but based on a configuration then it is
possible to do this by passing a argument to the dockerfile from the docker-compose build action.

Example:

    docker-compose build --build-arg config=debug

To run the containers as a service run:

    docker-compose up -d

``-d`` releases the terminal from the container terminal allowing it to run in the background.

To run two of the three services run:

    docker-compose up --force-recreate db web

In the above example the api can be run in ``debug`` and the rest of the application stack 'db' & 'web' are run allowing a developer experience to view the potencial issue or add features.

    docker-compose build --build-arg config=production
    docker-compose up  --force-recreate
    docker-compose up -d

To remove the services simple run in the same folder where the docker-compose file is, 

    docker-compose down


# Basics in orchestration

# Docker Swarm with compose 

## What is a swarm?
The cluster management and orchestration features embedded in the Docker Engine are built using swarmkit. Swarmkit is a separate project which implements Docker’s orchestration layer and is used directly within Docker.

A swarm consists of multiple Docker hosts which run in swarm mode and act as managers (to manage membership and delegation) and workers (which run swarm services). A given Docker host can be a manager, a worker, or perform both roles. When you create a service, you define its optimal state (number of replicas, network and storage resources available to it, ports the service exposes to the outside world, and more). Docker works to maintain that desired state. For instance, if a worker node becomes unavailable, Docker schedules that node’s tasks on other nodes. A task is a running container which is part of a swarm service and managed by a swarm manager, as opposed to a standalone container. For a complete [glossary](https://docs.docker.com/glossary/?term=Docker%20Swarm) have a look at [this](https://docs.docker.com/glossary/?term=Docker%20Swarm).

[read more.](https://docs.docker.com/engine/swarm/key-concepts/)


``NOTE:`` ```Working in the folder: [checkout location]/workshop/kubernetes-101/swarm```

In this example with will use a docker-compose.yml file to simply run a one replica container 

    docker stack deploy --compose-file docker-compose.yml stackdemo

To view the services run:

    docker service ls


![](../../resources/stack-deploy-single.png)

Open browser and navigate to http://localhost:8001 and you should see the UI that we created earlier.

For more information on replicas [read compose-file/#replicas](https://docs.docker.com/compose/compose-file/#replicas) from the official documentation.

Swarm is a nice way of getting familiar with orchestration and how to limit and control container workloads.


# Docker Kubernetes with compose

``NOTE:`` ```Working in the folder: [checkout location]/workshop/kubernetes-101/kube```

Docker Desktop includes a standalone Kubernetes server and client, as well as Docker CLI integration. The Kubernetes server runs locally within your Docker instance, is not configurable, and is a single-node cluster.

The Kubernetes server runs within a Docker container on your local system, and is only for local testing. When Kubernetes support is enabled, you can deploy your workloads, in parallel, on Kubernetes, Swarm, and as standalone containers. Enabling or disabling the Kubernetes server does not affect your other workloads.

[read more](https://docs.docker.com/docker-for-windows/kubernetes/)

Enable the Kubernetes by right clicking on the docker icon, select settings then Kubernetes.

![](../../resources/enable-kubernetes.png)


## Override the default orchestrator

While testing Kubernetes, you may want to deploy some workloads in swarm mode. Use the DOCKER_STACK_ORCHESTRATOR variable to override the default orchestrator for a given terminal session or a single Docker command. This variable can be unset (the default, in which case Kubernetes is the orchestrator) or set to swarm or kubernetes. The following command overrides the orchestrator for a single deployment, by setting the variable before running the command.

    set DOCKER_STACK_ORCHESTRATOR=kubernetes

Now you can run the deployment:

    docker stack deploy --compose-file docker-compose.yml kubestack

Alternatively, the ```--orchestrator``` flag may be set to ```swarm``` or ```kubernetes``` when deploying to override the default orchestrator for that deployment.

    docker stack deploy --orchestrator kubernetes  --compose-file docker-compose.yml kubestack


## Use the kubectl command

The windows Kubernetes integration provides the Kubernetes CLI command at ```C:\>Program Files\Docker\Docker\Resources\bin\kubectl.exe.``` This location may not be in your shell’s PATH variable, so you may need to type the full path of the command or add it to the PATH. For more information about kubectl, see the official kubectl documentation. You can test the command by listing the available nodes:

    kubectl get nodes

![](../../resources/kube-get-nodes.png)

Now lets deploy another application to demonstrate replicas in kubernetes:

    docker stack deploy --compose-file replica.docker-compose.yml kubestack

![](../../resources/kube-stack-demo2.png)

Open the browser and view the application:

![](../../resources/kube-demo-2.png)

[read more.](https://docs.docker.com/docker-for-windows/kubernetes/)

# Some More Kubernetes


### Kubernetes Clusters

Assuming everything is installed correctly let us check the version of the Kubctl

    kubectl version

A Kubernetes cluster consists of two types of resources:

Kubernetes coordinates a highly available cluster of computers that are connected to work as a single unit. The abstractions in Kubernetes allow you to deploy containerized applications to a cluster without tying them specifically to individual machines.

[read more](https://kubernetes.io/docs/tutorials/kubernetes-basics/create-cluster/cluster-intro/)

- The ``Master`` coordinates the cluster
- ``Nodes`` are the workers that run applications

![](../../resources/cluster-diagram.png)

The ``Master`` is responsible for managing the cluster. The master coordinates all activities in your cluster, such as scheduling applications, maintaining applications' desired state, scaling applications, and rolling out new updates.

A ``node`` is a VM or a physical computer that serves as a worker machine in a Kubernetes cluster. Each node has a ``Kubelet``, which is an agent for managing the node and communicating with the Kubernetes master. The node should also have tools for handling container operations, such as Docker or rkt. A Kubernetes cluster that handles production traffic should have a minimum of three nodes.

### Deployments

You can create and manage a Deployment by using the Kubernetes command line interface, ``Kubectl``. ``Kubectl`` uses the ``Kubernetes API`` to interact with the cluster. In this module, you'll learn the most common ``Kubectl`` commands needed to create Deployments that run your applications on a Kubernetes cluster.

When you create a Deployment, you'll need to specify the container image for your application and the number of replicas that you want to run. You can change that information later by updating your Deployment; Modules 5 and 6 of the bootcamp discuss how you can scale and update your Deployments.

Lets run a deployemnt that has already been setup:

    kubectl run kubernetes-bootcamp --image=gcr.io/google-samples kubernetes-bootcamp:v1 --port=8085

Now lets check the deployment:

    get deployments

![](../../resources/deployments.png)




For Kubernetes documentation, visit [kubernetes.io](https://kubernetes.io/docs/tutorials).



# Build pipelines in containers

Here is a example of a gitlab.com pipeline that makes use of containers to build: 

    image: docker:latest
    variables:
    VERSION: '2.2.0.$CI_PIPELINE_IID'
    DOCKER_IMAGE: registry.gitlab.com/minutz/minutz-core
    services:
    - docker:dind
    before_script:
    - docker login registry.gitlab.com -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD
    stages:
    - build
    - build.master
    - deploy

    build branches:
    stage: build
    script:
        - docker build -t $DOCKER_IMAGE:$VERSION -f .docker/Dockerfile .
    only:
        - branches

    build master:
    stage: build.master
    script:
        - docker run --rm -v ${PWD}:/build -w /build mcr.microsoft.com/powershell:latest pwsh -c "./build.ps1 '$VERSION' "
        - docker build -t $DOCKER_IMAGE:$VERSION -f .docker/Dockerfile .
        - docker push $DOCKER_IMAGE:$VERSION
    only:
        - master

    beta:
    tags:
        - host.linux,runner.shell,container.linux,type.deploy
    stage: deploy
    script:
        - echo $VERSION
        - echo DOCKER_IMAGE:$VERSION
        - echo -e '\nTAG='$VERSION >> .docker/.env
        - TAG=$VERSION
        - cd .docker
        - docker-compose up -d
    environment:
        name: beta
        url: https://core.minutz.net/swagger
    only:
    - master


And the Dockerfile that is used:

    FROM microsoft/dotnet:2.2-sdk AS build-env
    WORKDIR /app

    COPY . .
    RUN dotnet publish Minutz.Core.sln -c Release -o out

    FROM microsoft/dotnet:2.2-aspnetcore-runtime
    WORKDIR /app
    COPY --from=build-env /app/Minutz.Core.Api/out .
    ENTRYPOINT ["dotnet", "Minutz.Core.Api.dll"]

And when deploying the application a compose file is used:


    version: '3'

    services:
    core:
        image: "registry.gitlab.com/minutz/minutz-core:${TAG}"
        container_name: beta-minutz-core
        restart: unless-stopped
        env_file:
        - .env
        ports:
        - '3100:80'
        environment:
        - "ASPNETCORE_ENVIRONMENT=${ASPNETCORE_ENVIRONMENT}"
        - "CLIENTSECRET=${CLIENTSECRET}"
        - "DEFAULT_PASSWORD=2r31QYenF!aw"
        - "NOTIFY_DEFAULT_TEMPLATE_KEY=${NOTIFY_DEFAULT_TEMPLATE_KEY}"
        - "DOMAIN=${DOMAIN}"
        - "DEFAULT_CATALOGUE=${DEFAULT_CATALOGUE}"
        - "SERVER_ADDRESS=db.minutz.net,1430"
        - "DEFAULT_SCHEMA=app"
        - "DEFAULT_USER=sa"
        - "NOTIFY_KEY=${NOTIFY_KEY}"
        - "ReportMinutesKey=${ReportMinutesKey}"
        - "CLIENTID=${CLIENTID}"
        - "UI_BASE_URL=${UI_BASE_URL}"
        - "AUTHORITY=${AUTHORITY}"
        - "CONNECTION=${CONNECTION}"
        - "ReportUsername=${ReportUsername}"
        - "NOTIFY_USER=${NOTIFY-USER}"
        - "ReportPassword=${ReportPassword}"
        - "ReportUrl=${ReportUrl}"
        - "AuthorityManagmentToken=${AuthorityManagmentToken}"
        - "MANAGEMENT_CLIENTID=${MANAGEMENT_CLIENTID}"
        - "MANAGEMENT_CLIENT_SECRETE=${MANAGEMENT_CLIENT_SECRETE}"
        - "NOTIFY_INVITATION_ADDRESS=${NOTIFY_INVITATION_ADDRESS}"
        - "TAG=${TAG}"



kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v1.10.1/src/deploy/recommended/kubernetes-dashboard.yaml

kubectl proxy

Go to http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/ on Browser and you will get the below output:

PS C:\Users\Ajeet_Raina\Desktop> $TOKEN=((kubectl -n kube-system describe secret default | Select-String "token:") -split " +")[1]

PS C:\Users\Ajeet_Raina\Desktop> kubectl config set-credentials docker-for-desktop --token="${TOKEN