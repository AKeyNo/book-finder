-- Set params
set session my.number_of_users = '500';
set session my.start_date = '2019-01-01 00:00:00';
set session my.end_date = '2020-02-01 00:00:00';

-- load the pgcrypto extension to gen_random_uuid ()
CREATE EXTENSION pgcrypto;

-- Filling of users
INSERT INTO users
VALUES (0, 'user1', 'password');

INSERT INTO users
VALUES (1, 'user2', 'passwordtohash');

INSERT INTO users
VALUES (2, 'user3', 'weakpassword');

INSERT INTO readList
VALUES ('O5cFzgEACAAJ', 0);

INSERT INTO readList
VALUES ('O5cFzgEACAAJ', 2);

INSERT INTO readList
VALUES ('OiBboU3YUsgC', 1);

INSERT INTO readList
VALUES ('OiBboU3YUsgC', 2);