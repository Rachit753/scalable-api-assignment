const swaggerUi = require("swagger-ui-express");

const swaggerDocument = {
openapi: "3.0.0",
info: {
    title: "Scalable REST API",
    version: "1.0.0",
    description: "API documentation for Backend Developer assignment"
},
servers: [
    {
    url: "http://localhost:5000"
    }
],
paths: {
    "/api/v1/auth/register": {
    post: {
        summary: "Register new user",
        requestBody: {
        required: true,
        content: {
            "application/json": {
            example: {
                name: "Rachit",
                email: "rachit@test.com",
                password: "123456"
            }
            }
        }
        },
        responses: {
        201: {
            description: "User registered"
        }
        }
    }
    },

    "/api/v1/auth/login": {
    post: {
        summary: "Login user",
        responses: {
        200: {
            description: "Login successful"
        }
        }
    }
    },

    "/api/v1/tasks": {
    get: {
        summary: "Get user tasks",
        security: [{ bearerAuth: [] }]
    },
    post: {
        summary: "Create task",
        security: [{ bearerAuth: [] }]
    }
    }
},
components: {
    securitySchemes: {
    bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
    }
    }
}
};

module.exports = { swaggerUi, swaggerDocument };