# Running Containers

With the internet flooded with containers and container solutions, some inherent benefits and considerations need to be taken into account to allow a clear decision to be made.

# Benefits

- Containers run faster than virtual machines because they have less overhead.
- Finer grained environment setups as all dependencies are bundled in the container with environment settings
- potentially smaller overall workload and better utilisation of hardware
- Containers, by contrast, perform execution isolation at the operating system level. Here, a single operating system instance can support multiple containers, each running within its own, separate execution environment.
- Better isolation allows for component cohabitation because containers enable multiple execution environments to exist on a single operating system instance, multiple application components can coexist in a single VM environment. In addition, with Linux, you can use control groups (cgroups) to isolate the complete execution environment for a particular application code set, ensuring that each has a private environment and so cannot affect the operation of other applications.
- Due to the size and speed of creating a container the ability to rapidly scale applications is far quicker than increasing scale through conventional means
- Due to the inherent portability of containers, the ability to move from on-premise to cloud and between cloud vendors is far easier and quicker.
- Containers are closed by default and only exposing entry points declaratively the inherit security is easier to manage.


# Considerations

- Containers, you may end up needing to use a containers-as-a-service (CaaS) platform to make your container deployment easier to manage. 
- Most of those cost money.
- If not using a PaaS service then setup and the need to manage the installation, version and health of the containers can be a time-consuming task if no additional tools are used. 
- Without proper architecture, containers could potentially not work properly or present undesired behaviours in your applications.

# Conclusion

Some items are mentioned and like many technologies and solutions, it best to isolate what I required and achievable in the time frame provided, containers can speed up delivery of products as the unit of work can be bundled with all the dependencies and easily pass configurations through techniques like using environment variables making it simple to run the container in development, test, and staging versions of the software through a automated pipeline adhering to the DevOps principles.
