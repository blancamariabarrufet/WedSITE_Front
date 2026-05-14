-- Demo seed for the "Ver demo" button on the couple's experience panel.
-- All rows hang off submission id 00000000-0000-0000-0000-000000000001,
-- which matches the DEMO_SUBMISSION_ID in app/demo-login/route.ts.

insert into public.solicitation_submissions (
  id,
  couple_name,
  partner_one,
  partner_two,
  email,
  wedding_date,
  ceremony_venue,
  reception_venue,
  guest_count,
  physical_invitations,
  invitation_style,
  overall_vibe,
  color_palette,
  locale
) values (
  '00000000-0000-0000-0000-000000000001',
  'Blanca & Victor',
  'Blanca',
  'Victor',
  'demo@tudiadeblanco.com',
  date '2026-06-13',
  'Iglesia de Santa Maria, Madrid',
  'Finca El Olivar, Aravaca',
  120,
  true,
  'editorial',
  'Sereno, elegante, mediterraneo',
  'Blanco roto, oliva, terracota suave',
  'es'
) on conflict (id) do nothing;

-- Tables
insert into public.tables (id, name, capacity, shape, x, y, submission_id) values
  ('00000000-0000-0000-0000-000000000101', 'Mesa de los novios', 4, 'rectangular', 200, 120, '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000102', 'Familia Blanca', 8, 'round', 80, 260, '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000103', 'Familia Victor', 8, 'round', 320, 260, '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000104', 'Amigos universidad', 10, 'round', 80, 420, '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000105', 'Amigos trabajo', 10, 'round', 320, 420, '00000000-0000-0000-0000-000000000001')
on conflict (id) do nothing;

-- Guests (mix of statuses, dietary notes, plus-ones, table assignments)
insert into public.guests (id, first_name, last_name, email, phone, rsvp_status, dietary, plus_one, table_id, notes, submission_id) values
  ('00000000-0000-0000-0000-000000000201', 'Carmen', 'Ruiz',       'carmen.ruiz@example.com',     '+34 600 111 222', 'confirmed', 'Vegetariana',        false, '00000000-0000-0000-0000-000000000102', 'Madre de la novia',                    '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000202', 'Jose',   'Ruiz',       'jose.ruiz@example.com',       '+34 600 111 223', 'confirmed', '',                   false, '00000000-0000-0000-0000-000000000102', 'Padre de la novia',                    '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000203', 'Lucia',  'Ruiz',       'lucia.ruiz@example.com',      '+34 600 111 224', 'confirmed', '',                   true,  '00000000-0000-0000-0000-000000000102', 'Hermana de la novia, viene con pareja','00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000204', 'Pilar',  'Garcia',     'pilar.garcia@example.com',    '+34 600 111 225', 'pending',   'Sin gluten',         false, '00000000-0000-0000-0000-000000000102', 'Tia de la novia',                      '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000205', 'Manuel', 'Fernandez',  'manuel.fernandez@example.com','+34 600 222 331', 'confirmed', '',                   false, '00000000-0000-0000-0000-000000000103', 'Padre del novio',                      '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000206', 'Isabel', 'Fernandez',  'isabel.fernandez@example.com','+34 600 222 332', 'confirmed', 'Alergia a frutos secos', false, '00000000-0000-0000-0000-000000000103', 'Madre del novio',                  '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000207', 'Pablo',  'Fernandez',  'pablo.fernandez@example.com', '+34 600 222 333', 'declined',  '',                   false, null,                                   'Hermano del novio, vive en Australia', '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000208', 'Andrea', 'Lopez',      'andrea.lopez@example.com',    '+34 600 333 441', 'confirmed', 'Vegana',             true,  '00000000-0000-0000-0000-000000000104', 'Mejor amiga de Blanca',                '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000209', 'Marta',  'Sanchez',    'marta.sanchez@example.com',   '+34 600 333 442', 'confirmed', '',                   false, '00000000-0000-0000-0000-000000000104', 'Compañera de piso universidad',        '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000210', 'Diego',  'Martin',     'diego.martin@example.com',    '+34 600 333 443', 'confirmed', '',                   false, '00000000-0000-0000-0000-000000000104', '',                                     '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000211', 'Sara',   'Jimenez',    'sara.jimenez@example.com',    '+34 600 333 444', 'pending',   'Intolerancia lactosa',false,'00000000-0000-0000-0000-000000000104', 'Confirmar antes del 15 de mayo',       '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000212', 'Javier', 'Romero',     'javier.romero@example.com',   '+34 600 444 551', 'confirmed', '',                   true,  '00000000-0000-0000-0000-000000000105', 'Compañero de Victor en la oficina',    '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000213', 'Laura',  'Vidal',      'laura.vidal@example.com',     '+34 600 444 552', 'awaiting',  '',                   false, '00000000-0000-0000-0000-000000000105', 'Invitacion enviada, sin respuesta',    '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000214', 'Adrian', 'Castro',     'adrian.castro@example.com',   '+34 600 444 553', 'confirmed', 'Pescetariano',       false, '00000000-0000-0000-0000-000000000105', '',                                     '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000215', 'Nuria',  'Ortega',     'nuria.ortega@example.com',    '+34 600 444 554', 'declined',  '',                   false, null,                                   'No puede asistir por viaje',           '00000000-0000-0000-0000-000000000001')
on conflict (id) do nothing;

-- Budget items across multiple categories
insert into public.budget_items (id, category, description, budgeted, actual, deposit_paid, payment_due_date, paid_status, notes, submission_id) values
  ('00000000-0000-0000-0000-000000000301', 'Venue',         'Finca El Olivar - alquiler completo', 12000, 12500, 4000, date '2026-05-15', 'deposit_paid', 'Incluye montaje y desmontaje',           '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000302', 'Catering',      'Menu degustacion para 120 invitados',  9500,  9500, 9500, date '2026-06-01', 'fully_paid',   'Confirmado tras la prueba de menu',      '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000303', 'Photography',   'Fotografo + video, 10 horas',          3200,  3200, 1000, date '2026-06-05', 'deposit_paid', 'Estudio Luz & Sombra',                   '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000304', 'Music',         'DJ ceremonia + cocktail + cena',       1800,  1800, 1800, date '2026-04-30', 'fully_paid',   '',                                       '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000305', 'Flowers',       'Decoracion floral y centros mesa',     2400,     0,    0, date '2026-06-10', 'unpaid',       'Pago final una semana antes',            '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000306', 'Stationery',    'Invitaciones impresas + meseros',       650,   620,  620, date '2026-03-20', 'fully_paid',   'Lote inicial entregado',                 '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000307', 'Attire',        'Vestido novia + traje novio',          3500,  3500, 1500, date '2026-05-20', 'deposit_paid', 'Pendiente la prueba final',              '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000308', 'Transportation','Autobuses para invitados (Madrid)',     900,     0,    0, date '2026-06-08', 'unpaid',       'Dos rutas confirmadas',                  '00000000-0000-0000-0000-000000000001')
on conflict (id) do nothing;

-- RSVP settings
insert into public.rsvp_settings (submission_id, is_open, deadline, meal_options) values
  ('00000000-0000-0000-0000-000000000001', true, date '2026-05-15', array['Carne', 'Pescado', 'Vegetariano', 'Vegano'])
on conflict (submission_id) do nothing;

-- News posts
insert into public.news_posts (id, title, body, status, date, submission_id) values
  ('00000000-0000-0000-0000-000000000401',
   'Reservad la fecha',
   'Queridos amigos y familia, el 13 de junio de 2026 nos casamos. Pronto recibireis los detalles completos por aqui.',
   'published',
   date '2026-01-10',
   '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000402',
   'Transporte para invitados',
   'Habra dos autobuses saliendo desde Plaza de Castilla a las 11:30 y desde Moncloa a las 11:45. Confirmadnos vuestra ruta preferida en el RSVP.',
   'published',
   date '2026-04-22',
   '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000403',
   'Dress code y recomendaciones',
   'El dress code es coctel formal en tonos calidos. La ceremonia es exterior, recomendamos zapatos comodos.',
   'draft',
   date '2026-05-01',
   '00000000-0000-0000-0000-000000000001')
on conflict (id) do nothing;

-- Letters from guests
insert into public.letters (id, guest_name, anonymous, body, read, submission_id) values
  ('00000000-0000-0000-0000-000000000501',
   'Carmen',
   false,
   'Mi niña, no puedo creer que llegue este dia. Os esperamos con los brazos abiertos. Con todo mi cariño, mama.',
   true,
   '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000502',
   'Andrea',
   false,
   'Blanca, gracias por hacerme parte de esto. Victor, cuidala bien (aunque ya se que lo haces). Os quiero mucho a los dos.',
   false,
   '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000503',
   '',
   true,
   'Os deseo toda la felicidad del mundo. Sois un ejemplo de lo bonito que puede ser el amor cuando es de verdad.',
   false,
   '00000000-0000-0000-0000-000000000001')
on conflict (id) do nothing;

-- Knowledge base context block (for the AI concierge)
insert into public.knowledge_base (submission_id, context_block, updated_at) values
  ('00000000-0000-0000-0000-000000000001',
   'Boda de Blanca y Victor el 13 de junio de 2026. Ceremonia a las 12:30 en la Iglesia de Santa Maria (Madrid). Coctel y banquete a partir de las 14:30 en Finca El Olivar (Aravaca). Dress code: coctel formal en tonos calidos. Habra autobuses desde Plaza de Castilla y Moncloa.',
   now())
on conflict (submission_id) do update set
  context_block = excluded.context_block,
  updated_at = excluded.updated_at;

-- QA pairs for the concierge
insert into public.qa_pairs (id, question, answer, "order", submission_id) values
  ('00000000-0000-0000-0000-000000000601', '¿A que hora es la ceremonia?',          'La ceremonia comienza a las 12:30 en la Iglesia de Santa Maria. Os recomendamos llegar 15 minutos antes.', 1, '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000602', '¿Cual es el dress code?',                'Coctel formal en tonos calidos. La ceremonia es exterior, asi que recomendamos zapatos comodos.',            2, '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000603', '¿Habra transporte para los invitados?',  'Si, dos autobuses desde Madrid: Plaza de Castilla a las 11:30 y Moncloa a las 11:45.',                       3, '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000604', '¿Hasta cuando puedo confirmar asistencia?', 'La fecha limite para el RSVP es el 15 de mayo de 2026.',                                                   4, '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000605', '¿Hay opciones para alergias o dietas especiales?', 'Si. Podeis indicar vuestras necesidades dieteticas en el formulario de RSVP y el catering se adapta.',  5, '00000000-0000-0000-0000-000000000001')
on conflict (id) do nothing;
