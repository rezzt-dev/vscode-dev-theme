-- muestra de sql para revisar el resaltado de dark dev
CREATE TABLE IF NOT EXISTS slots (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(64) NOT NULL UNIQUE,
    value       INTEGER DEFAULT 15658734,
    created_at  TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_slots_name ON slots (name);

/* resumen de slots por rango */
SELECT s.name, COUNT(*) AS total, MAX(s.value) AS top
FROM slots s
INNER JOIN ramps r ON r.slot_id = s.id AND r.step > 5
WHERE s.name LIKE 'ink%' AND s.value IS NOT NULL
GROUP BY s.name
HAVING COUNT(*) > 1
ORDER BY total DESC
LIMIT 10;

INSERT INTO slots (name, value) VALUES ('ink', 0xEEEEEE), ('on', 24);
UPDATE slots SET value = value + 1 WHERE id IN (SELECT id FROM ramps);
DELETE FROM slots WHERE created_at < '2024-01-01';
