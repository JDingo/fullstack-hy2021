CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes int DEFAULT 0
);

insert into blogs (author, url, title) values ('Dan Abramov', 'WRC.url', 'Writing resilient component');
insert into blogs (author, url, title) values ('Johan Runeberg', 'vanrikkistoo.li', 'Vänrikki Stoolin blogi');