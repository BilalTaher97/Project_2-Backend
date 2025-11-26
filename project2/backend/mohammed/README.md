# 📝 User API Documentation

---

## 1️⃣ Get All Tasks

**GET** `/user/tasks`

**Headers:**

```json
{
  "Authorization": "Bearer <token>"
}
```

**Success 200**

```json
{
  "success": true,
  "tasks": [
    {
      "id": 8,
      "task_name": "New Task",
      "status": "completed",
      "due_date": "2025-02-14T22:00:00.000Z",
      "progress": 50
    },
    {
      "id": 9,
      "task_name": "Tests",
      "status": "pending",
      "due_date": "2025-11-28T22:00:00.000Z",
      "progress": 10
    },
    {
      "id": 10,
      "task_name": "Printting Welcome message\t",
      "status": "in-progress",
      "due_date": "2025-12-04T22:00:00.000Z",
      "progress": 20
    }
  ]
}
```

---

## 2️⃣ Get Single Task

**GET** `/user/tasks/:id`

**Headers:**

```json
{
  "Authorization": "Bearer <token>"
}
```

**Params:**\
`id` = Task ID

**Success 200**

```json
{
  "id": 10,
  "task_name": "Prepare Report",
  "description": "Task details...",
  "due_date": "2025-01-15",
  "status": "in-progress",
  "priority": "high",
  "progress": 20
}
```

---

## 3️⃣ Get User Profile

**GET** `/user/profile`

**Headers:**

```json
{
  "Authorization": "Bearer <token>"
}
```

**Success 200**

```json
{
  "success": true,
  "profile": {
    "id": 7,
    "name": "Laith",
    "photo": "http://image.com/pic.png",
    "department": "IT",
    "email": "laith@mail.com",
    "role_id": 1,
    "isactive": true,
    "created_at": "2025-11-25T15:50:50.397Z"
  }
}
```

---

## 4️⃣ Dashboard Overview

**GET** `/user/dashboard`

**Headers:**

```json
{
  "Authorization": "Bearer <token>"
}
```

**Success 200**

```json
{
  "success": true,
  "data": {
    "status": {
      "total": "3",
      "completed": "1",
      "pending": "1",
      "in_progress": "1",
      "overdue": "0"
    },
    "tasks": [
      {
        "id": 9,
        "task_name": "Tests",
        "progress": 0,
        "status": "pending"
      },
      {
        "id": 8,
        "task_name": "New Task",
        "progress": 100,
        "status": "completed"
      },
      {
        "id": 10,
        "task_name": "Printting Welcome message\t",
        "progress": 30,
        "status": "in-progress"
      }
    ]
  }
}
```

---

## 5️⃣ Update Task Progress

**PUT** `/user/tasks/:id`

status calcuated base on the progress
when progress is 0 it will be pending
100 completed
any other value while be in-progress

**Headers:**

```json
{
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
}
```

**Body**

```json
{
  "progress": 20
}
```

**Success 200**

```json
{
  "success": true,
  "message": "Progress updated successfully"
}
```
