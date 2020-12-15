# GoOutdoor

Welcome to GoOutdoor! GoOutdoor is an open-source e-commerce platform using service oriented architecture(SOA), and this projest is specifically for the related items module in an application. This project is based on a legacy code base, which had a fully working front end with a minimum of back end. My work was focused on the back end side with database/server directories. If you're interested in my front end work, you can take a look at [Souperhost Review Section](https://github.com/souperhost-3000/service-chris)!

## Related Projects

  - [GoOutdoor Display Module](https://github.com/The-10-000-RPS-Club/display-service.git)
  - [GoOutdoor Q&A Module](https://github.com/The-10-000-RPS-Club/service-jacki.git)
  - [GoOutdoor Reviews Module](https://github.com/The-10-000-RPS-Club/reviews-joe.git)

## Table of Contents

1. [Database](#database)
1. [Server Optimization and Scaling the Architecture](#server-optimization-and-scaling-the-architecture)
1. [Result](#result)

## Database
I needed to decide what database to use for my module. So, I first chose widely used SQL database and NoSQL database, PostgreSQL and Cassandra DB. Then, I benchmarked two databases by obtaining query time data in three sections of my data set, the first 10%, the middle 10%, and the last 10% of my data set. In each section, I performed 4 queries spread out across the section. 

![Database Benchmark](Database_Benchmark.png)
<h6 align="center"> Table 1. Database Benchmark </h6>

As can be seen on the Table 1 above, the query time of PostgreSQL was faster than the query time of Cassandra for cached and non-cached data. Also, because of Postgres’s strong developer community, PostgreSQL was a better fit for my specific use case.

## Server Optimization and Scaling the Architecture

![Server Architecture](https://github.com/The-10-000-RPS-Club/relatedItems-chris/blob/master/Server_Architecture.png)

After deploying my application to Amazon Web Service (AWS) Elastic Compute Cloud (EC2), I had one NGINX as a load balancer to distribute incoming requests, one service server instance, and one database instance. Then, I used a stress testing tool called loader.io to test my application. I could get 500 RPS without having an error rate of over 1%. I horizontally scaled my application by taking a snapshot image of the service server and creating another EC2 instance for the service server. With two service server instances, I could get 1000 RPS. By seeing this increase, I added third and fourth instances, expecting to get at least 1500 RPS. However, it did not go over 1050 RPS. So, I knew I hit the bottleneck and had to find a different solution. After researching, I utilized streaming replication to create a copy of the database and connected two service server instances to that copied database. Finally, with one load balancer, four service instances, and two database instances, I could achieve 2000 RPS, increasing 1500 RPS from the initial RPS.

## Result
After benchmarking databases and optimizing the application’s architecture, I could get a 300% increase in throughput. This means more concurrent users can interact with the application without being angry because of wait time, and more happy users will result in an increase in a company’s revenue. Overall, I was happy that I could overcome the challenge and meet the goal.
