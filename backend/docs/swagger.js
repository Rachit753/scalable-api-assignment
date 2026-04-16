const swaggerUi = require("swagger-ui-express");

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Scalable REST API",
    version: "1.0.0",
    description: "Full API documentation for Task Management System"
  },
  servers: [
    {
      url: "http://localhost:5000"
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  paths: {

    "/api/v1/auth/register": {
      post: {
        summary: "Register user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              example: {
                name: "User",
                email: "user@test.com",
                password: "123456"
              }
            }
          }
        },
        responses: {
          201: { description: "User registered successfully" }
        }
      }
    },

    "/api/v1/auth/login": {
      post: {
        summary: "Login user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              example: {
                email: "user@test.com",
                password: "123456"
              }
            }
          }
        },
        responses: {
          200: { description: "Login successful" }
        }
      }
    },

    "/api/v1/tasks": {
      get: {
        summary: "Get user tasks (with pagination & filter)",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "page", in: "query", schema: { type: "integer" } },
          { name: "limit", in: "query", schema: { type: "integer" } },
          { name: "status", in: "query", schema: { type: "string" } }
        ],
        responses: {
          200: { description: "Tasks fetched successfully" }
        }
      },
      post: {
        summary: "Create new task",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              example: {
                title: "Learn Node.js",
                description: "Build backend APIs",
                status: "pending"
              }
            }
          }
        },
        responses: {
          201: { description: "Task created" }
        }
      }
    },

    "/api/v1/tasks/{id}": {
      get: {
        summary: "Get single task",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          200: { description: "Task fetched" }
        }
      },
      put: {
        summary: "Update task",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              example: {
                title: "Updated Task",
                status: "completed"
              }
            }
          }
        },
        responses: {
          200: { description: "Task updated" }
        }
      },
      delete: {
        summary: "Delete task",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          200: { description: "Task deleted" }
        }
      }
    },

    "/api/v1/admin/users": {
      get: {
        summary: "Get all users (admin only)",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Users fetched" }
        }
      }
    },

    "/api/v1/admin/tasks": {
      get: {
        summary: "Get all tasks (admin only)",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "All tasks fetched" }
        }
      }
    },

    "/api/v1/admin/tasks/{id}": {
      delete: {
        summary: "Delete any task (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          200: { description: "Task deleted by admin" }
        }
      }
    }

  }
};

module.exports = { swaggerUi, swaggerDocument };