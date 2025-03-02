# Cloud Project

 
---

## Prerequisites

- **Docker** and **Docker Compose** installed  
- **Minikube** installed and configured  
- **kubectl** installed
- **Postman** installed

---

## Running the Database Locally

The PostgreSQL database is run using Docker Compose. To start the database:

1. **Check or update the `docker-compose.yml` file** to ensure your database settings are correct.
2. Start the database with:

   ```bash
   docker-compose up -d
   ```

## Deploying the services

Deploy the services by runing the `deploy.sh` script:

   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

## Running the services

Run each service in a separate terminal:

```bash
minikube service service-a
```

```bash
minikube service service-b
```

# Test the app

1. Import the postman collection and environment 
2. Copy the minikube urls into the corresponding environment variable
3. Make your tests !

