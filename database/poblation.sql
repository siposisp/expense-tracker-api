
-- POBLACIÓN 1: CATEGORÍAS

INSERT INTO "Category" (name)
VALUES
    ('Alimentación'),
    ('Transporte'),
    ('Vivienda'),
    ('Servicios básicos'),
    ('Salud'),
    ('Educación'),
    ('Entretenimiento'),
    ('Compras'),
    ('Suscripciones'),
    ('Otros')
ON CONFLICT (name) DO NOTHING;




























-- POBLACIÓN 2: GASTOS DE LOS USUARIOS 1 Y 2

INSERT INTO "Expense"
    (amount, description, date, "userId", "categoryId")
SELECT
    datos.amount,
    datos.description,
    datos.date,
    datos.user_id,
    c.id
FROM (
    VALUES
        -- Gastos del usuario 1
        (1, 'Alimentación',  4500.00::DECIMAL, 'Almuerzo',                 TIMESTAMP '2026-10-01 13:30:00'),
        (1, 'Transporte',    1200.00::DECIMAL, 'Viaje en metro',            TIMESTAMP '2026-10-02 08:15:00'),
        (1, 'Alimentación',  8500.00::DECIMAL, 'Compra de supermercado',    TIMESTAMP '2026-10-03 17:00:00'),
        (1, 'Entretenimiento', 9990.00::DECIMAL, 'Entrada al cine',         TIMESTAMP '2026-10-04 19:30:00'),
        (1, 'Servicios básicos', 18000.00::DECIMAL, 'Cuenta de electricidad', TIMESTAMP '2026-10-05 10:00:00'),
        (1, 'Transporte',    1500.00::DECIMAL, 'Viaje en bus',              TIMESTAMP '2026-10-06 09:00:00'),
        (1, 'Salud',         6500.00::DECIMAL, 'Compra de medicamentos',    TIMESTAMP '2026-10-07 12:00:00'),
        (1, 'Suscripciones',  5990.00::DECIMAL, 'Suscripción mensual',      TIMESTAMP '2026-10-08 20:00:00'),
        (1, 'Compras',      15990.00::DECIMAL, 'Compra de ropa',            TIMESTAMP '2026-10-09 16:30:00'),
        (1, 'Alimentación',  3200.00::DECIMAL, 'Café y desayuno',           TIMESTAMP '2026-10-10 09:30:00'),

        -- Gastos del usuario 2
        (2, 'Alimentación',  5500.00::DECIMAL, 'Almuerzo fuera de casa',    TIMESTAMP '2026-10-01 14:00:00'),
        (2, 'Transporte',    1400.00::DECIMAL, 'Viaje en metro',            TIMESTAMP '2026-10-02 08:45:00'),
        (2, 'Vivienda',    250000.00::DECIMAL, 'Pago de arriendo',           TIMESTAMP '2026-10-03 10:00:00'),
        (2, 'Servicios básicos', 22000.00::DECIMAL, 'Cuenta de agua',       TIMESTAMP '2026-10-04 11:00:00'),
        (2, 'Educación',    12000.00::DECIMAL, 'Material de estudio',        TIMESTAMP '2026-10-05 15:30:00'),
        (2, 'Entretenimiento', 7500.00::DECIMAL, 'Salida al cine',           TIMESTAMP '2026-10-06 20:00:00'),
        (2, 'Alimentación', 18000.00::DECIMAL, 'Compra de supermercado',    TIMESTAMP '2026-10-07 17:30:00'),
        (2, 'Transporte',    3000.00::DECIMAL, 'Viajes en bus',              TIMESTAMP '2026-10-08 08:00:00'),
        (2, 'Salud',         9500.00::DECIMAL, 'Consulta médica',            TIMESTAMP '2026-10-09 12:30:00'),
        (2, 'Otros',         4000.00::DECIMAL, 'Gasto imprevisto',           TIMESTAMP '2026-10-10 18:00:00')
) AS datos(user_id, category_name, amount, description, date)
JOIN "Category" c
    ON c.name = datos.category_name
JOIN "User" u
    ON u.id = datos.user_id;
