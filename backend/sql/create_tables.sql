-- Creation of users table
CREATE TABLE IF NOT EXISTS users (
  user_id INT NOT NULL,
  username VARCHAR(250) NOT NULL UNIQUE,
  hashedPassword VARCHAR(250) NOT NULL,
  token VARCHAR(250),
  PRIMARY KEY (user_id)
);

-- Creation of readList table
CREATE TABLE IF NOT EXISTS readList (
  book_id VARCHAR(250) NOT NULL,
  user_id INT NOT NULL,
  pagesRead INT NOT NULL DEFAULT 0,
  score INT NOT NULL DEFAULT 0 CHECK (score >= 0 AND score <= 10),
  status INT NOT NULL DEFAULT 0,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
    REFERENCES users(user_id),
  PRIMARY KEY(book_id, user_id)
);