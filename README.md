# 🛒 Ishop Backend

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

A robust and scalable REST API built to power the **Ishop** e-commerce platform. This backend handles user authentication, product management, and shopping cart logic.

---

## 📝 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [License](#-license)
- [Author](#-author)

---

## ✨ Features

* **User Management:** Secure user registration and profile creation.
* **Product CRUD:** Create, Read, Update, and Delete product listings.
* **Shopping Cart:** Add products to a persistent cart and manage quantities.
* **Checkout Flow:** Logic to facilitate buying products.
* **Database Integration:** Scalable data storage using MongoDB.

---

## 🛠 Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (with Mongoose ODM)
* **Frontend:** React (Integrated via API calls)

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v14 or higher recommended)
* [MongoDB](https://www.mongodb.com/) (Local instance or Atlas URI)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/bhuvesh/ishop-backend.git](https://github.com/bhuvesh/ishop-backend.git)
    cd ishop-backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory and add your configuration:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    ```

---

## 💻 Usage

To launch the server:

```bash
npm start
