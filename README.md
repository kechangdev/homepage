# Preview
![image](https://github.com/user-attachments/assets/79b7626e-583c-4f65-a704-5edaa9671da8)
![image](https://github.com/user-attachments/assets/ae8a74bc-e3a6-4651-83c2-07b804b0a00a)


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Deploy with Docker

### **1. Build the Docker Image**
Use the following command to build your Docker image:

```shell
docker build -t <image_name>:<tag> .
```

Replace `<image_name>` with your desired image name and `<tag>` with the version tag (e.g., `v1.0`).

---

### **2. Tag the Docker Image**
Tag your image to use the `latest` tag for easy reference:

```shell
docker tag <image_name>:<tag> <image_name>:latest
```

---

### **3. Push the Image to Docker Hub**
Push your Docker image to Docker Hub (or any other container registry):

```shell
docker push <image_name>:latest
```

Ensure you are logged in to Docker Hub before pushing the image:
```shell
docker login
```

---

### **4. Run the Container**
Run your container using the following command:

```shell
docker run --rm \
           --name home \
           -d \
           -p <port>:3000 \
           <image_name>:latest
```

- Replace `<port>` with the port you want to expose on your host machine.
- Replace `<image_name>` with the name of your Docker image.

The `--rm` flag ensures that the container is automatically removed when it stops, and `-d` runs it in detached mode.
