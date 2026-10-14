
-- 1. Crear el tipo enumerado para los roles
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- 2. Crear la tabla de usuarios
CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Crear la tabla de categorías
CREATE TABLE "Category" (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    "isActive" BOOLEAN NOT NULL DEFAULT TRUE
);

-- 4. Crear la tabla de gastos
CREATE TABLE "Expense" (
    id SERIAL PRIMARY KEY,
    amount DECIMAL(12, 2) NOT NULL,
    description TEXT,
    date TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
    "userId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Expense_userId_fkey"
        FOREIGN KEY ("userId")
        REFERENCES "User"(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT "Expense_categoryId_fkey"
        FOREIGN KEY ("categoryId")
        REFERENCES "Category"(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT "Expense_amount_check"
        CHECK (amount > 0)
);

-- 5. Crear la tabla de tokens para recuperar contraseñas
CREATE TABLE "PasswordResetToken" (
    id SERIAL PRIMARY KEY,
    token TEXT NOT NULL UNIQUE,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    used BOOLEAN NOT NULL DEFAULT FALSE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PasswordResetToken_userId_fkey"
        FOREIGN KEY ("userId")
        REFERENCES "User"(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- 6. Crear índices para mejorar consultas frecuentes
CREATE INDEX "Expense_userId_idx"
    ON "Expense" ("userId");

CREATE INDEX "Expense_categoryId_idx"
    ON "Expense" ("categoryId");

CREATE INDEX "Expense_date_idx"
    ON "Expense" (date);

CREATE INDEX "PasswordResetToken_userId_idx"
    ON "PasswordResetToken" ("userId");
