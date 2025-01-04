CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES ('John Doe', 'https://myawesomeblog.com', 'My Awesome Blog', 0);

INSERT INTO blogs (author, url, title, likes) VALUES ('Jane Doe', 'https://greatblogs.com', 'Just a Great Blog', 0);