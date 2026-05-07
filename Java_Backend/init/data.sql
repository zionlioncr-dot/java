-- Insertar algunos datos iniciales
INSERT INTO app_user (name, email) VALUES
('Juan Pérez', 'juan@example.com'),
('Ana Gómez', 'ana@example.com');

INSERT INTO posts (user_id, title, content) VALUES
(1, 'Hola mundo', 'Este es mi primer post en la red simbiótica.'),
(2, 'Eco-simbiosis', 'Cuidemos la naturaleza con tecnología sostenible.');