
-- Table: Users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  Username VARCHAR(50),
  NationalNumber VARCHAR(50)UNIQUE NOT NULL,
  Email VARCHAR(50) UNIQUE NOT NULL,
  Phone VARCHAR(13) UNIQUE,
  is_active BOOLEAN NOT NULL
);

-- Table: Salaries
CREATE TABLE IF NOT EXISTS Salaries(
  id SERIAL PRIMARY KEY,
  Year INT NOT NULL,
  Month INT NOT NULL,
  Salary DECIMAL(10,2) NOT NULL,
  User_ID INT REFERENCES users(id) ON DELETE CASCADE
);

-- Table: logs
CREATE TABLE IF NOT EXISTS logs (
  id SERIAL PRIMARY KEY,
  log_type VARCHAR(50),       
  message TEXT,               
  details TEXT,               
  created_at TIMESTAMP DEFAULT NOW()
);