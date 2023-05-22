drop schema if exists game_store;

create schema game_store;

use game_store;

create table category(type varchar(50) primary key);

create table game(
	id varchar(10) primary key,
	name varchar(255) unique not null,
    price float,
    discount float,
    description text,
    ratings float check(ratings>=0 and ratings<=5),
    spec_minimum text,
    spec_recommended text,
    picture_1 text,
    picture_2 text,
    picture_3 text,
    picture_4 text
);

create table activation_code(
	game_id varchar(10) references game(id) on delete cascade on update cascade,
    code varchar(16) unique,
    status varchar(13) default 'available' check(status='used' or status='available'),
    primary key(game_id,code)
);

create table belongs_to(
	game_id varchar(10) references game(id) on delete cascade on update cascade,
    category_type varchar(50) references category(type) on delete cascade on update cascade,
    primary key(game_id,category_type)
);

create table customer(
	id varchar(10) primary key,
    name varchar(100) not null,
    email varchar(50) unique not null,
    phone varchar(10),
    total_spending double default 0.0,
    membership_rank varchar(8) default 'None' check(membership_rank ='None' or membership_rank='Silver' or membership_rank='Gold' or membership_rank='Diamond' or membership_rank='Special'),
    membership_discount float default 0 check(0<=membership_discount and membership_discount<=5),
    username varchar(20) unique not null,
    userpassword varchar(20) not null,
    image text not null
);

create table admin(
	id varchar(10) primary key,
    name varchar(100) not null,
    email varchar(20) unique not null,
    phone varchar(10) not null,
    address varchar(150),
    username varchar(20) unique not null,
    userpassword varchar(20) not null,
    image text not null
);

create table wishlist(
	game_id varchar(10) references game(id) on delete cascade on update cascade,
    customer_id varchar(10) references customer(id) on delete cascade on update cascade,
    primary key(game_id,customer_id)
);

create table shopping_cart(
	game_id varchar(100) references game(id) on delete cascade on update cascade,
    customer_id varchar(10) references customer(id) on delete cascade on update cascade,
    amount int default 1 check(amount>=1), -- this attribute is not in use and should be deleted
    primary key(game_id,customer_id)
);

create table purchase_history_description(
	id varchar(10) primary key,
    method varchar(15) check(method='MoMo wallet' or method='Online banking'),
    date date not null
);

create table purchase_history(
	customer_id varchar(10) references customer(id) on delete cascade on update cascade,
    game_id varchar(10),
    code varchar(16),
    description_id varchar(10) references purchase_history_description(id) on delete cascade on update cascade,
    primary key(customer_id,game_id,code,description_id),
    foreign key(game_id,code) references activation_code(game_id,code) on delete cascade on update cascade
);