#!/bin/bash

set -e

# Function to print a banner
function banner() {
  echo "======================================"
  echo "$1"
  echo "======================================"
}

# Start Minikube if it's not running already
#banner "Starting Minikube..."
#minikube start

kubectl apply -f local-postgres.yaml

# Deploy Service A
banner "Deploying Service A..."
kubectl apply -f input/service-a-deployment.yaml
kubectl apply -f input/service-a-service.yaml


# Deploy Service B
banner "Deploying Service B..."
kubectl apply -f output/service-b-deployment.yaml
kubectl apply -f output/service-b-service.yaml


banner "Deployment complete!"

# Wait a few seconds for the services to be up
sleep 5

# Retrieve Minikube IP
MINIKUBE_IP=$(minikube ip)
echo "Minikube IP: $MINIKUBE_IP"

# Retrieve NodePorts for Service A and Service B
SERVICE_A_PORT=$(kubectl get svc service-a -o jsonpath='{.spec.ports[0].nodePort}')
SERVICE_B_PORT=$(kubectl get svc service-b -o jsonpath='{.spec.ports[0].nodePort}')

echo "Service A is available at: http://$MINIKUBE_IP:$SERVICE_A_PORT"
echo "Service B is available at: http://$MINIKUBE_IP:$SERVICE_B_PORT"