# Expense Tracker API

A REST API for personal expense management built with Node.js, Express, TypeScript, PostgreSQL, and Prisma.

## Project Overview

Managing personal expenses can become difficult when financial information is scattered across notes, spreadsheets, or different applications.

Expense Tracker API is a backend service designed to provide a centralized and secure way to register, organize, and query personal expenses.

The system is intended to be consumed in the future by a web or mobile frontend. This project focuses exclusively on the backend, including data management, business logic, authentication, authorization, and database persistence.

Users will be able to:

- Create an account and authenticate securely.
- Register personal expenses.
- Associate each expense with a predefined category.
- View and manage only their own financial information.
- Filter expenses by date or category.
- Review spending information through reporting endpoints.

The system also includes an administrator role responsible for managing the categories available to users and accessing administrative information when required.

Categories such as `Food`, `Transportation`, `Health`, or `Entertainment` are global and managed by administrators.

A generic `Other` category is also available for expenses that do not fit into the predefined categories.

Categories can be deactivated instead of permanently deleted in order to preserve historical expense data.

## Main Goal

The main goal of this project is to build a secure and maintainable REST API while practicing backend development concepts such as:

- REST API design
- Layered architecture
- Authentication with JWT
- Role-based authorization
- Password hashing
- Relational database design
- Database migrations
- Business logic separation
- Input validation
- Error handling
- Automated testing
- API documentation
- Containerization

## Tech Stack

- Node.js
- TypeScript
- Express
- PostgreSQL
- Prisma ORM
- JWT
- bcrypt

Planned technologies:

- Zod
- Swagger / OpenAPI
- Jest
- Supertest
- Docker
- GitHub Actions

## Architecture

The project follows a layered architecture:

```text
Route
  ↓
Middleware
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Prisma
  ↓
PostgreSQL