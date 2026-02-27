CREATE TABLE IF NOT EXISTS lpdd.key_services (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS lpdd.organization_services (
  id SERIAL PRIMARY KEY,
  organization_id INTEGER REFERENCES lpdd.organizations(id),
  service_id INTEGER REFERENCES lpdd.key_services(id)
);
