-- Creation of users table
CREATE TABLE IF NOT EXISTS users (
  user_id INT NOT NULL,
  username VARCHAR(250) NOT NULL UNIQUE,
  hashedPassword VARCHAR(250) NOT NULL,
  summary VARCHAR(250) NOT NULL,
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

CREATE TABLE IF NOT EXISTS bookReviews (
  book_id VARCHAR(250) NOT NULL,
  author_id INT NOT NULL,
  postTime timestamptz,
  review TEXT,
  CONSTRAINT fk_user
    FOREIGN KEY(author_id)
    REFERENCES users(user_id),
  PRIMARY KEY(book_id, author_id)
);

CREATE TABLE IF NOT EXISTS bookReviewLikes (
  book_id VARCHAR(250) NOT NULL,
  author_id INT NOT NULL,
  userWhoLiked_id INT NOT NULL,
  likedTime timestamptz,
  CONSTRAINT fk_user
    FOREIGN KEY(author_id)
    REFERENCES users(user_id),
  PRIMARY KEY(book_id, author_id, userWhoLiked_id)
);

-- Set params
set session my.number_of_users = '500';
set session my.start_date = '2019-01-01 00:00:00';
set session my.end_date = '2020-02-01 00:00:00';

-- load the pgcrypto extension to gen_random_uuid ()
CREATE EXTENSION pgcrypto;

-- Filling of users
INSERT INTO users
VALUES (0, 'user0', 'notarealpassword1becausehash', 'Hello!', 'notarealtoken1');

INSERT INTO users
VALUES (1, 'user1', 'notarealpassword1becausehash2', 'Hello 2!', 'notarealtoken2');

INSERT INTO users
VALUES (2, 'user2', 'notarealpassword1becausehash3', 'Hello 3!', 'notarealtoken3');

INSERT INTO readList
VALUES ('O5cFzgEACAAJ', 0, 100, 10, 1);

INSERT INTO readList
VALUES ('O5cFzgEACAAJ', 1, 50, 9, 2);

INSERT INTO readList
VALUES ('O5cFzgEACAAJ', 2, 25, 4, 3);