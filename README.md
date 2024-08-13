# Результаты тестов и запросов

## Результаты запросов

1. **Регистрация нового пользователя**

   **Запрос:**
   {
     "name": "John Doe",
     "email": "john.doe@example.com",
     "password": "password123"
   }

## Ответ:
{
  "createdAt": "2024-08-13T09:54:38.095Z",
  "updatedAt": "2024-08-13T09:54:38.095Z",
  "id": 6,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "$2a$10$QihreeYecm7V3T1B3la23ulnhRFz4etMIvz5ZcyKZcGexv7g1z1bu"
}

2. **Вход в систему**

   **Запрос:**
{
  "email": "john.doe@example.com",
  "password": "password123"
}

## Ответ:
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTcyMzU0MjkwNH0.A6Sdth9aSx-pD7BufoskvcdAeIJZbGPwqSKoDB2gmSc"
}

3. **Создание новой задачи**

   **Запрос:**
{
  "title": "My First Task",
  "description": "This is a description of my first task."
}

## Ответ:
{
  "createdAt": "2024-08-13T09:56:09.917Z",
  "updatedAt": "2024-08-13T09:56:09.917Z",
  "id": 2,
  "title": "My First Task",
  "description": "This is a description of my first task.",
  "userId": 6
}

4. **Получение всех задач пользователя**

## Ответ:
[
  {
    "id": 2,
    "title": "My First Task",
    "description": "This is a description of my first task.",
    "userId": 6,
    "createdAt": "2024-08-13T09:56:09.917Z",
    "updatedAt": "2024-08-13T09:56:09.917Z"
  }
]

5. **Получение всех пользователей**

## Ответ:
[
  {
    "id": 6,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "$2a$10$QihreeYecm7V3T1B3la23ulnhRFz4etMIvz5ZcyKZcGexv7g1z1bu",
    "createdAt": "2024-08-13T09:54:38.095Z",
    "updatedAt": "2024-08-13T09:54:38.095Z"
  }
]



# Результаты тестов
Task Model

should create a task: ✔
should not create a task without title: ✔
User Model

should create a user: ✔
should not create a user with duplicate email: ✔
