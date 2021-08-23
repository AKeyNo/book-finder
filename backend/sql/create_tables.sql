-- Creation of users table
CREATE TABLE IF NOT EXISTS users (
  user_id INT NOT NULL,
  username varchar(250) NOT NULL UNIQUE,
  hashedPassword varchar(250) NOT NULL,
  token varchar(250),
  PRIMARY KEY (user_id)
);

-- Creation of readList table
CREATE TABLE IF NOT EXISTS readList (
  book_id varchar(250) NOT NULL,
  user_id INT NOT NULL,
  pages_read INT NOT NULL DEFAULT 0,
  finished BOOLEAN NOT NULL DEFAULT FALSE,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
    REFERENCES users(user_id),
  PRIMARY KEY(book_id, user_id)
);