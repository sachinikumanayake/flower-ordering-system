# Flower Ordering System

## Project Overview

The **`flower-ordering-system`** is a complete E-Commerce Application built using the MERN stack (Node.js, Express, React, and MongoDB). It is designed to include all necessary functionalities for both the User (Customer) and the Admin side.

## Core Features

### Customer Portal

* **Flower Browsing:** Ability to select flower bouquets and browse by various categories.
* **Shopping Cart:** Features for adding items to the cart, modifying item quantity, and removing items.
* **User Authentication:** User Registration and Secure Login functionality.
* **Checkout & Ordering:** Facility to place orders and view Order History.

### Admin Panel

* **Product Management:** Ability to Add new flower bouquets, Edit existing ones, and Delete products.
* **Order Management:** Viewing all orders placed by users and updating their Status.
* **User Management:** Managing registered User Accounts.

## Tech Stack Used

This project utilizes the following main technological layers:

* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Frontend:** React.js, Vite
* **Styling:** Tailwind CSS

## Setup and Installation

### Prerequisites

To run this project, you need the following software installed:

* Node.js (LTS version)
* MongoDB Instance (Local or Atlas)
* Git

### Getting Started

1.  **Clone the Repository:**

    ```bash
    git clone [https://github.com/sachinikumanayake/flower-ordering-system.git](https://github.com/sachinikumanayake/flower-ordering-system.git)
    cd flower-ordering-system
    ```

2.  **Install Dependencies:**

    ```bash
    # Install Backend dependencies
    cd backend
    npm install

    # Install Frontend dependencies
    cd ../frontend
    npm install
    ```

3.  **Configure the `.env` File:**

    * Create a file named `.env` inside the `backend` folder.
    * Add your Database URI, Port number, and your Secret Keys to this file. 

4.  **Run the Project:**

    * Start the Backend Server:
        ```bash
        cd backend
        npm run dev
        ```
    * Start the Frontend Application:
        ```bash
        cd frontend
        npm run dev
        ```

---

*Project developed by **sachinikumanayake**.*