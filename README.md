# 🚀 Automated Deployment of Node.js Server to AWS

## 📌 Overview
This repository contains a **CI/CD pipeline** using **GitHub Actions** to automatically deploy a **Node.js server** to an AWS instance whenever code is pushed to the `main` branch. The deployment process is containerized using **Docker & Docker Compose** for seamless and consistent deployment.

## 🛠️ Features
✅ **Fully Automated Deployment** – No manual intervention required! 🚀  
✅ **Secure SSH Access** – Uses **GitHub Secrets** for private key authentication 🔑  
✅ **Dockerized Setup** – Ensures consistency across all environments 🐳  
✅ **Zero Downtime Deployment** – Restarts the server with the latest code ⚡  
✅ **GitHub Actions Workflow** – Easy-to-maintain CI/CD pipeline 🤖  

---

## 📂 Folder Structure
```plaintext
├── .github/workflows/deploy.yml   # GitHub Actions workflow for deployment
├── docker-compose.yml             # Docker Compose file to manage services
├── Dockerfile                     # Defines the Node.js container setup
├── src/                            # Application source code
└── README.md                      # Project documentation
```

---

## 🔧 How It Works
1️⃣ **Push to Main**: Whenever a commit is pushed to the `main` branch, GitHub Actions is triggered.  
2️⃣ **Checkout Code**: The repository is cloned inside the GitHub Actions runner.  
3️⃣ **Set Up SSH**: The workflow securely connects to the AWS server using **GitHub Secrets**.  
4️⃣ **Pull Latest Changes**: The latest code is pulled from the repository into the AWS instance.  
5️⃣ **Rebuild & Restart**: Docker Compose **stops running containers**, **rebuilds them**, and **starts the updated application**.  
6️⃣ **Deployment Complete**! 🎉

---

## 🚀 Deployment Workflow (GitHub Actions)
The CI/CD pipeline is defined in `.github/workflows/deploy.yml`:

```yaml
name: Deploy Node.js Server

on:
  push:
    branches:
      - main  # Runs when code is pushed to the main branch

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up SSH
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.AWS_SSH_PRIVATE_KEY }}" | tr -d '\r' > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          ssh-keyscan -H ${{ secrets.AWS_HOST }} >> ~/.ssh/known_hosts
        env:
          AWS_SSH_PRIVATE_KEY: ${{ secrets.AWS_SSH_PRIVATE_KEY }}
          AWS_HOST: ${{ secrets.AWS_HOST }}

      - name: Deploy to AWS
        run: |
          ssh -i ~/.ssh/id_rsa ${{ secrets.AWS_USER }}@${{ secrets.AWS_HOST }} << 'EOF'
            cd ${{ secrets.PROJECT_DIR }}
            git pull origin main
            docker-compose down
            docker-compose up -d --build
          EOF
        env:
          AWS_USER: ${{ secrets.AWS_USER }}
          AWS_HOST: ${{ secrets.AWS_HOST }}
          PROJECT_DIR: ${{ secrets.PROJECT_DIR }}
```

---

## 🔐 Environment Variables & Secrets
To keep sensitive information secure, the following **GitHub Secrets** must be set:
| Secret Name             | Description |
|-------------------------|-------------|
| `AWS_SSH_PRIVATE_KEY`  | Private key for SSH authentication |
| `AWS_HOST`             | AWS server IP address or hostname |
| `AWS_USER`             | SSH username for AWS server |
| `PROJECT_DIR`          | Directory on AWS where the project is stored |
| `APP_NAME`             | (Optional) Application name for reference |

> 🔒 **Important:** Never hardcode credentials in the workflow file. Always use **GitHub Secrets** for security!

---

## 📢 Getting Started
### Prerequisites
- **Node.js & NPM** installed
- **Docker & Docker Compose** installed
- **AWS EC2 Instance** with SSH access

### Setup Instructions
1️⃣ **Fork & Clone** this repository.  
2️⃣ **Set up AWS Secrets** in GitHub (`Settings` → `Secrets and variables`).  
3️⃣ **Push Code to Main** → GitHub Actions will **automatically deploy** the changes!  

---

## 🤝 Contributing
Contributions are welcome! If you find any bugs or have feature requests, feel free to **open an issue** or **submit a pull request**. 🚀

---

## 📜 License
This project is licensed under the **MIT License**. Feel free to use and modify it as needed.

---

💡 **Need Help?** Feel free to reach out or open an issue! 😊
