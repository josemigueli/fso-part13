CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES ('John Doe', 'https://myawesomeblog.com', 'My Awesome Blog', 0);
INSERT INTO blogs (author, url, title, likes) VALUES ('Jane Doe', 'https://greatblogs.com', 'Just a Great Blog', 0);

INSERT INTO reading_lists (name, user_id) VALUES ('Javascript', 1);
INSERT INTO reading_lists (name, user_id) VALUES ('Frontend', 1);

INSERT INTO reading_lists (name, user_id) VALUES ('Java', 2);
INSERT INTO reading_lists (name, user_id) VALUES ('PHP', 2);

INSERT INTO reading_list_items (user_id, reading_list_id, blog_id) VALUES (1, 1, 1);
INSERT INTO reading_list_items (user_id, reading_list_id, blog_id) VALUES (1, 2, 2);

INSERT INTO reading_list_items (user_id, reading_list_id, blog_id) VALUES (2, 3, 3);
INSERT INTO reading_list_items (user_id, reading_list_id, blog_id) VALUES (2, 4, 4);