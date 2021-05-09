-- Creation of temperature table
CREATE TABLE IF NOT EXISTS temperature (
  id INT NOT NULL,
  temperature float  NOT NULL,
  Date  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (id)
);
