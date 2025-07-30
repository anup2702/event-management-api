# 🎯 Event Management API

A RESTful backend application built with **Node.js**, **Express**, **PostgreSQL**, and **Sequelize ORM**. It allows users to register for events, cancel registrations, and view event details, statistics, and upcoming events.

-----

## 📦 Features

  - 🔐 Create and manage events
  - 👤 Register and cancel user registrations
  - 📊 View event statistics (capacity, usage)
  - 📅 List upcoming events (sorted by date, then location)
  - ❌ Prevent duplicate & past-event registrations
  - ✅ Clean and modular code structure with validation and error handling

-----

## 🛠️ Tech Stack

  - **Node.js** + **Express.js**
  - **PostgreSQL** + **Sequelize ORM**
  - **Joi** (for input validation)
  - **dotenv** (for environment variables)
  - **Day.js** (date & time handling)
  - **Thunder Client / Postman** (for testing APIs)

-----

## 🚀 Getting Started

### 1️⃣ Clone the Project

```bash
git clone https://github.com/anup2702/event-management-api.git
cd event-management-api
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Up PostgreSQL

Make sure PostgreSQL is installed and running.

Create a database named `eventdb`:

```sql
CREATE DATABASE eventdb;
```

### 4️⃣ Create .env File

In the project root, add a `.env` file:

```env
DATABASE_URL=postgres://postgres:<your_password>@localhost:5432/eventdb
PORT=3000
```

Replace `<your_password>` with your actual PostgreSQL password.

### 5️⃣ Run the Server

```bash
npm run dev   # For development (nodemon)
npm start     # For production
```

If everything is correct, you’ll see:

```
Database synced
Server running on port 3000
```

-----

## 📂 Folder Structure

```
event-management-api/
├── controllers/
│  └── eventController.js
│  └── userController.js
├── models/
│  └── index.js
│  └── Event.js
│  └── User.js
│  └── Registration.js
├── routes/
│  └── eventRoutes.js
│  └── userRoutes.js
├── middleware/
│  └── errorHandler.js
│  └── validate.js
├── utils/
│  └── validators.js
├── .env
├── app.js
├── server.js
├── package.json
└── README.md
```

-----

## 🔗 API Endpoints

### 👥 User APIs

| Method | Endpoint      | Description       |
| :----- | :------------ | :---------------- |
| `POST` | `/users`      | Create a new user |
| `GET`  | `/users`      | Get all users     |
| `GET`  | `/users/:id`  | Get user by ID    |

### 📅 Event APIs

| Method   | Endpoint                  | Description                            |
| :------- | :------------------------ | :------------------------------------- |
| `POST`   | `/events`                 | Create a new event                     |
| `GET`    | `/events/:id`             | Get event details & registered users   |
| `POST`   | `/events/:id/register`    | Register user for an event             |
| `DELETE` | `/events/:id/register/:userId` | Cancel registration                    |
| `GET`    | `/events/upcoming`        | List all future events                 |
| `GET`    | `/events/:id/stats`       | Event statistics (capacity, usage, etc.) |

-----

## 📬 Sample API Request

**`POST /events`**

```json
{
  "title": "Hackathon 2025",
  "datetime": "2025-09-01T10:00:00.000Z",
  "location": "Bangalore",
  "capacity": 100
}
```

**`POST /events/1/register`**

```json
{
  "userId": 1
}
```

-----

## 🧪 Testing the API

You can use any of these tools:

✅ **Thunder Client**
✅ **Postman**
✅ **VS Code REST Client Extension**

### Sample Test in Thunder Client

**`POST http://localhost:3000/users`**

```json
{
  "name": "Anup Kumar",
  "email": "anup@example.com"
}
```

**`GET http://localhost:3000/events/upcoming`**

-----

## ⚠️ Business Logic Rules

  * Max capacity: `<= 1000`
  * No registration for past events
  * No duplicate registrations
  * Cancel registration only if the user is already registered
  * Return proper HTTP status codes & errors

-----

## 🛠️ Commands Reference

| Command       | Description                      |
| :------------ | :------------------------------- |
| `npm install` | Install dependencies             |
| `npm run dev` | Start server with nodemon        |
| `npm start`   | Start server in production mode  |

