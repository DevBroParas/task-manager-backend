# Task Manager Server

This is the backend server for the Task Manager application. It is built using Node.js, Express, and MongoDB. The server provides APIs for user authentication, project management, and task management.

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd task-manager/server
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the `server` folder and add the following environment variables:

    ```env
    PORT=8080
    MONGO_URI=<your-mongodb-connection-string>
    JWT_SECRET=<your-jwt-secret>
    NODE_ENV=development
    FRONTEND_URL=<your-frontend-url>
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

The server will start on `http://localhost:8080` by default.

---

## API Routes

### User Routes

**Base URL:** `/api/v1/user`

1. **Register User**

    - **Endpoint:** `POST /register`
    - **Description:** Registers a new user.
    - **Request Body:**
        ```json
        {
            "name": "string",
            "email": "string",
            "password": "string",
            "country": "string"
        }
        ```
    - **Response:**
        ```json
        {
            "user": {
                "_id": "string",
                "name": "string",
                "email": "string",
                "country": "string",
                "createdAt": "string",
                "updatedAt": "string"
            },
            "token": "string"
        }
        ```

2. **Login User**

    - **Endpoint:** `POST /login`
    - **Description:** Logs in an existing user.
    - **Request Body:**
        ```json
        {
            "email": "string",
            "password": "string"
        }
        ```
    - **Response:**
        ```json
        {
            "user": {
                "_id": "string",
                "name": "string",
                "email": "string",
                "country": "string",
                "createdAt": "string",
                "updatedAt": "string"
            },
            "token": "string"
        }
        ```

3. **Get Current User**
    - **Endpoint:** `GET /me`
    - **Description:** Retrieves the currently logged-in user's details.
    - **Response:**
        ```json
        {
            "user": {
                "_id": "string",
                "name": "string",
                "email": "string",
                "country": "string",
                "createdAt": "string",
                "updatedAt": "string"
            }
        }
        ```

---

### Project Routes

**Base URL:** `/api/v1/project`

1. **Create Project**

    - **Endpoint:** `POST /`
    - **Description:** Creates a new project.
    - **Request Body:**
        ```json
        {
            "name": "string"
        }
        ```
    - **Response:**
        ```json
        {
            "project": {
                "_id": "string",
                "name": "string",
                "createdAt": "string",
                "updatedAt": "string"
            }
        }
        ```

2. **Get All Projects**

    - **Endpoint:** `GET /`
    - **Description:** Retrieves all projects for the logged-in user.
    - **Response:**
        ```json
        {
            "projects": [
                {
                    "_id": "string",
                    "name": "string",
                    "createdAt": "string",
                    "updatedAt": "string"
                }
            ]
        }
        ```

3. **Update Project**

    - **Endpoint:** `PUT /:id`
    - **Description:** Updates a project by ID.
    - **Request Body:**
        ```json
        {
            "name": "string"
        }
        ```
    - **Response:**
        ```json
        {
            "project": {
                "_id": "string",
                "name": "string",
                "createdAt": "string",
                "updatedAt": "string"
            }
        }
        ```

4. **Delete Project**
    - **Endpoint:** `DELETE /:id`
    - **Description:** Deletes a project by ID.
    - **Response:**
        ```json
        {
            "message": "Project deleted successfully"
        }
        ```

---

### Task Routes

**Base URL:** `/api/v1/task`

1. **Create Task**

    - **Endpoint:** `POST /:projectId`
    - **Description:** Creates a new task for a specific project.
    - **Request Body:**
        ```json
        {
            "title": "string",
            "description": "string",
            "status": "string"
        }
        ```
    - **Response:**
        ```json
        {
            "task": {
                "_id": "string",
                "title": "string",
                "description": "string",
                "status": "string",
                "project": "string",
                "createdAt": "string",
                "updatedAt": "string"
            }
        }
        ```

2. **Get All Tasks for a Project**

    - **Endpoint:** `GET /:projectId`
    - **Description:** Retrieves all tasks for a specific project.
    - **Response:**
        ```json
        {
            "tasks": [
                {
                    "_id": "string",
                    "title": "string",
                    "description": "string",
                    "status": "string",
                    "project": "string",
                    "createdAt": "string",
                    "updatedAt": "string"
                }
            ]
        }
        ```

3. **Update Task**

    - **Endpoint:** `PUT /:id`
    - **Description:** Updates a task by ID.
    - **Request Body:**
        ```json
        {
            "title": "string",
            "description": "string",
            "status": "string"
        }
        ```
    - **Response:**
        ```json
        {
            "task": {
                "_id": "string",
                "title": "string",
                "description": "string",
                "status": "string",
                "project": "string",
                "createdAt": "string",
                "updatedAt": "string"
            }
        }
        ```

4. **Delete Task**
    - **Endpoint:** `DELETE /:id`
    - **Description:** Deletes a task by ID.
    - **Response:**
        ```json
        {
            "message": "Task deleted successfully"
        }
        ```

---

### Project Schema

The `Project` schema defines the structure of a project document in the database:

-   **Fields**:
    -   `name` (String, required): The name of the project.
    -   `user` (ObjectId, required): A reference to the `User` who owns the project.
    -   `tasks` (Array of ObjectId): References to the `Task` documents associated with the project.
-   **Timestamps**: Includes `createdAt` and `updatedAt`.

### Task Schema

The `Task` schema defines the structure of a task document in the database:

-   **Fields**:
    -   `title` (String, required): The title of the task.
    -   `description` (String, required): A detailed description of the task.
    -   `status` (String, required): The status of the task, with allowed values: `pending`, `in-progress`, or `completed`.
    -   `startedAt` (Date): The date when the task was started.
    -   `completedAt` (Date): The date when the task was completed.
    -   `project` (ObjectId): A reference to the `Project` the task belongs to.
    -   `user` (ObjectId, required): A reference to the `User` who created the task.
