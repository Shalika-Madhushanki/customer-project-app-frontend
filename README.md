# Project Name

## Overview

This project provides a simple management interface for **Customers** and **Projects**. Users can navigate between these entities and perform CRUD (Create, Read, Update, Delete) operations on both.

## Prerequisites

- **Docker** and **Docker Compose** should be installed on your machine.
- **Node.js** (for local development).

## Setup and Available Scripts

In the project directory, you can run the following commands:

### `npm install`

Installs the dependencies required by the application. Run this command once after cloning the repository.

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


### `npm run build`

Builds the app for production in the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Building and Running Your Application with Docker

To build and run your application with Docker:

1. In the project root directory, run:
   ```bash
   npm run build
   ```

1. In the project root directory, run:
   ```bash
   docker compose up --build
   ```

2. Once the build is complete, the application will be available at [http://localhost:3000](http://localhost:3000).

### Navigating the Application

- By default, the app will direct you to the **Customers** screen.
- You can switch between **Customers** and **Projects** screens using the menu bar at the top.
- Each screen provides the following functionalities:
  - **Create**: Add a new customer or project.
  - **Read**: View a list of all customers or projects.
  - **Update**: Edit details of an existing customer or project.
  - **Delete**: Remove a customer or project.

## Database and API Configuration

Backend to this application is available at:
[https://github.com/Shalika-Madhushanki/customer-project-backend](https://github.com/Shalika-Madhushanki/customer-project-backend)