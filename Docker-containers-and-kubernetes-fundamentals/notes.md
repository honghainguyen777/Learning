# [Docker Containers and Kubernetes Fundamentals](https://youtu.be/kTp5xUtcalw?si=ytzEYYMqJ5Zs9H0B)

## Microservices Architecture
- A variant of the service-oriented architecture (SOA) structural style - arranges an application as a collection of loosely coupled services.
- In a microservices architecture, services are fine-grained and the protocols are lightweight
- Segregates functionality into smaller separate services each with a single responsibility
- Scales out by deploying each service independently
- Loosely coupled
- Enable autonomous development by different teams, languages and platforms
- Can be written by smaller teams
- Each microservice can own it's own data/database

## Cloud Native
Within a short time, cloud native has become a driving trend in the software industry
- It's a new way to think about building complex systems
- Takes full advantage of modern software development practices, technologies and cloud infastructure
- Widely popular in the open source communities
- Cloud Native uses containers, service meshes, microservices, immutable infrastructure and declarative APIs
- These techniques enable loosely coupled systems that are resilient, manageble and observable. Combined with robust automation, they allow engineers to make high impact changes frequently and predictably with minimal toil.
- Speed and Agility: users want instataneous responsiveness, up-to-the-minute features, and no downtime. The business wants accelerated innovation, rapid releases of features to meet discription from competiors and increased confidence - stabilty/performace

Application architecture: Clean code -> Domain Driven Design -> Microservices Principles -> Kubernetes Patterns

## Docker
### Introduction
Docker is an open source container runtime. It supports Mac, Windows & Linux. It contains command line tool and `Dockerfile` file format for building container images

### Docker CLI Cheat Sheet
#### Management
- `docker info`: display system information
- `docker version`: display the system's version
- `docker login`: log in to a Docker registry

#### Running and stopping
- `docker pull [imageName]`: pull an image from a registry
- `docker run [imageName]`: run containers
- `docker run -d [imageName]`: run containers in detached mode
- `docker run --publish [hostPort]:[containerListeningPort] --name [containerLocalName] [imageName]`: pull and run a server. We can use `-d` option to run the container in the background -> we can login as root in the container
- `docker run -it [imageName] -- /bin/bash`: run and attach shell to a container. `/bin/bash` can be replaced by Powershell (`microsoft/powershell:nanoserverpwsh.exe`)
- `docker container exec -it [containerName] -- bash`: attach to a running container
- `docker start [containerName]`: start containers
- `docker ps`: list nunning containers
- `docker ps -a`: list all running and stopped containers
- `docker stop [containerName]`: stop containers
- `docker kill [containerName]`: Kill containers
- `docker image inspect [imageName]`: get image info

Cleaning up
- `docker rm [containerName]`: remove a stopped container
- `docker rm $(docker ps -a -q)`: remove all stoped containers
- `docker rmi [imageNAme]`: remove an image
- `docker system prune -a`: removes all images not in use by any containers. BE CAREFUL TO USE THIS!!!

#### Limits
- `docker run --memory="256m" nginx`: max memory
- `docker run --cpu=".5" nginx`: max CPU

