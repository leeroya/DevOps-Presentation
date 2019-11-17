# Pros

- Docker containers run faster than virtual machines because they have less overhead.
- Finer grained environment setups as all depenancies are bundled in the container with environmnet settings
- potencially smaller overall workload and better utilisation of hardware
- Containers, by contrast, perform execution isolation at the operating system level. Here, a single operating system instance can support multiple containers, each running within its own, separate execution environment.
- Better isolation allows for component cohabitation, because containers enable multiple execution environments to exist on a single operating system instance, multiple application components can coexist in a single VM environment. In addition, with Linux, you can use control groups (cgroups) to isolate the complete execution environment for a particular application code set, ensuring that each has a private environment and so cannot affect the operation of other applications.


# Cons

- Containers, you may end up needing to use a containers-as-a-service (CaaS) platform to make your container deployment easier to manage. 
- Most of those cost money.
