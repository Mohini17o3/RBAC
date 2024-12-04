# RBAC Application

## Overview

This project is a Role-Based Access Control (RBAC) application built using **Next.js**, **MongoDB**, **Prisma**, and **Express** , **Tailwind** and **Shadcn** for styling. It offers a secure authentication and authorization system for managing user roles and permissions. The application features role-specific access to different resources, making it ideal for managing user roles in various systems.

## Features

- **User Authentication:** Users can log in and sign up with JWT token-based authentication.
- **Role Management:** Different roles (e.g., Admin, User) are handled to control access to resources.
- **Dashboard Access:** After logging in, users can access a personalized dashboard based on their role.
- **Protected Routes:** Some routes are protected and only accessible based on the admin's role.
- **Responsive UI:** The application is fully responsive, adapting to all screen sizes, including mobile, tablet, and desktop views.
- **CRUD Operations:** Users can create, read, update, and delete resources depending on their role.

## Tech Stack

- **Frontend:** Next.js (React framework)
- **Backend:** Express.js
- **Database:** MongoDB, Prisma ORM
- **Authentication:** JWT (JSON Web Token)
- **Styling:** Tailwind CSS for responsive UI

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- **Node.js** (LTS version)
- **MongoDB** (local or cloud instance)
- **npm** (Node Package Manager)

### 1. Clone the repository

Follow the instructions below to set up the project on your local machine.

```bash
git clone https://github.com/Mohini17o3/RBAC.git
cd RBAC
```

###2 .Set up the Frontend
Navigate to the frontend directory and install the dependencies:

```bash
cd Frontend/rbac
npm install
```

###3. Set up the Backend
Navigate to the backend directory and install the dependencies:

```bash
cd Backend
npm install
```

### 4. Configure Environment Variables
Create a .env.local file in the root of your Backend project and add the following environment variables:

```bash
DATABASE_URL=YOUR_DATABASE_CONNECTION_URL
TOKEN_SECRET=YOUR_TOKEN_SECRET
```

###5. Run the Frontend Server
Start the frontend development server:

```bash
cd Frontend/rbac
npm run dev

```

###6. Run the Backend Server
Start the backend server:

```bash
cd Backend
node src/index.js
```

Your application should now be running locally with both the frontend and backend servers.







