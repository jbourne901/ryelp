create table products (
  id serial not null primary key,
  name varchar(50) not null,
  price int,
  on_sale boolean
);

create table restaurants (
  id serial not null primary key,
  name varchar(50) not null,
  location varchar(50) not null,
  price_range int not null check(price_range >=1 and price_range<=5)
);

create table reviews (
  id serial not null primary key,
  restaurant_id bigint not null references restaurants(id),
  name varchar(50) not null,
  review text not null,
  rating int check(rating>=1 and rating <=5)
);

