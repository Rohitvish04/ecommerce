 # E-commerce Product API (Node.js + Prisma + Neon + Render Deployment)

This is a simple **RESTful API for an E-commerce product catalog**, built using:

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL (Neon)
- Deployed on Render

---

## 📌 Live API Base URL:

https://ecommerce-1azq.onrender.com/


 

---

## 📌 API Endpoints and Links

| Method | Endpoint | Description | Example Link |
|------ |------ |---- |---- |
| `POST` | `/products` | Create a new product | [POST /products](https://your-app-name.onrender.com/products) |
| `GET` | `/products` | List products (supports pagination, category filter, search) | [GET /products](https://your-app-name.onrender.com/products) |
| `GET` | `/products/:id` | Get product by ID | [GET /products/1](https://your-app-name.onrender.com/products/1) |
| `PUT` | `/products/:id` | Update product by ID | [PUT /products/1](https://your-app-name.onrender.com/products/1) |
| `DELETE` | `/products/:id` | Delete product by ID | [DELETE /products/1](https://your-app-name.onrender.com/products/1) |

---

## 📌 Example Query Parameters for `/products`

| Parameter | Type | Description | Example |
|--- |--- |--- |--- |
| `page` | Number | Pagination page | `/products?page=1&limit=5` |
| `limit` | Number | Items per page | `/products?page=1&limit=5` |
| `category` | String | Filter by category | `/products?category=Electronics` |
| `search` | String | Search by product name/title | `/products?search=phone` |
| Combine | Any | Combine multiple | `/products?category=Electronics&search=phone&page=1&limit=5` |

---

## 📌 Technologies Used

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL (Neon)
- Render (Deployment)

---

## 📌 Local Setup Instructions

1. **Clone the repository:**

```bash
git clone https://github.com/Rohitvish04/ecommerce.git
cd ecommerce
