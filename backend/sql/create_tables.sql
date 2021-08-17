-- Creation of users table
CREATE TABLE IF NOT EXISTS users (
  user_id INT NOT NULL,
  username varchar(250) NOT NULL UNIQUE,
  password varchar(250) NOT NULL,
  PRIMARY KEY (user_id)
);

-- Creation of readList table
CREATE TABLE IF NOT EXISTS readList (
  book_id varchar(250) NOT NULL,
  user_id INT NOT NULL,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
    REFERENCES users(user_id)
);