# Pros

- Containers run faster than virtual machines because they have less overhead.
- Finer grained environment setups as all depenancies are bundled in the container with environmnet settings
- potencially smaller overall workload and better utilisation of hardware
- Containers, by contrast, perform execution isolation at the operating system level. Here, a single operating system instance can support multiple containers, each running within its own, separate execution environment.
- Better isolation allows for component cohabitation, because containers enable multiple execution environments to exist on a single operating system instance, multiple application components can coexist in a single VM environment. In addition, with Linux, you can use control groups (cgroups) to isolate the complete execution environment for a particular application code set, ensuring that each has a private environment and so cannot affect the operation of other applications.
- Due to the size and speed of creating a container the ability to rapidly scale applications is far quicker that increasing scale through conventional means
- Due to the inhernt portability of containers the ability to move from on premis to cloud and between cloud vendors is far easier and quicker.



# Cons

- Containers, you may end up needing to use a containers-as-a-service (CaaS) platform to make your container deployment easier to manage. 
- Most of those cost money.
