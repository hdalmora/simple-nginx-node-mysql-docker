
# Simple Nginx proxy for a node.js application connected to a MySQL DB

Through this project's `docker-compose.yaml` we can spin up a multi-container app with `Nginx` as a reverse proxy on port `8080` that redirects all connections to our `Node.js` app running on port `3000`

## Project Structure
    ├── mysql                   
    │   ├── Dockerfile            # Creates the DB image and copy the `initdb.sql` file to our container
    │   ├── initdb.sql            # SQL for creating the DB and necessary table
    └── node
    │   ├── actions               # All actions that will insert or read data from our DB
    │   |   ├── addPerson.js      # Adds a new person to the DB
    │   |   ├── getAllPersons.js  # Returns a list of persons from the DB
    │   ├── constant              # Contains all project constant objects, like the `dbconfig.js`
    │   ├── Dockerfile            # Creates the Node.js image
    └── nginx
    │   ├── Dockerfile            # Creates the Nginx image
    │   ├── nginx.conf            # Configuration file for nginx to allow a reversy proxxy against the `app` container
    └── docker-compse.yaml        # Used to run the multi-containers `mysql`, `nginx` and `node`


Each one of these folder represents a container that will be handled by the `docker-compose.yaml` file in the project root

## Usage/Example

After cloning the repo, simply run the following command:

```
docker compose up --build
```

It will build all three images eand run the containers

Now, simply access your `localhost:8080`, and `nginx` will proxy it to the port `3000` inside the `node` container that is running our application

Everytime you reload the page, a nre `record` will be added to the `people` table with a ramdon person name. And a List with all the names will be outputed in the page, like so:

![Screenshot 2024-07-12 125356](https://github.com/user-attachments/assets/e24df2c0-c7ed-46f8-8b6c-3e155add54c7)

## Reference

 - [Full Cycle 3.0 Course](https://fullcycle.com.br/)


