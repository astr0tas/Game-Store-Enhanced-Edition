drop schema if exists game_store;

create schema game_store;

use game_store;

create table category(type varchar(50) primary key);

create table game(
	id varchar(10) primary key,
	name varchar(100) unique not null,
    price float,
    discount float,
    description text,
    ratings float check(ratings>=0 and ratings<=5),
    spec_minimum text,
    spec_recommended text,
    picture_1 mediumblob,
    picture_2 mediumblob,
    picture_3 mediumblob,
    picture_4 mediumblob
);

create table activation_code(
	game_id varchar(10) references game(id) on delete cascade on update cascade,
    code varchar(16) unique,
    status varchar(13) default 'available' check(status='used' or status='available'),
    primary key(game_id,code)
);

create table belongs_to(
	game_id varchar(10) references game(id) on delete cascade on update cascade,
    category_type varchar(20) references category(type) on delete cascade on update cascade,
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
    userpassword varchar(20) not null
);

create table admin(
	id varchar(10) primary key,
    name varchar(100) not null,
    email varchar(20) unique not null,
    phone varchar(10) not null,
    address varchar(150),
    username varchar(20) unique not null,
    userpassword varchar(20) not null
);

create table wishlist(
	game_id varchar(10) references game(id) on delete cascade on update cascade,
    customer_id varchar(10) references customer(id) on delete cascade on update cascade,
    primary key(game_id,customer_id)
);

create table shopping_cart(
	game_id varchar(100) references game(id) on delete cascade on update cascade,
    customer_id varchar(10) references customer(id) on delete cascade on update cascade,
    amount int default 1 check(amount>=1),
    primary key(game_id,customer_id)
);

create table purchase_history_description(
	id varchar(10) primary key,
    method varchar(15) check(method='MoMo payment' or method='Online banking'),
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

-- create table old_category(
-- 	description_id varchar(10) references update_game_description(id) on delete cascade on update cascade,
--     type varchar(20),
--     primary key(description_id,type)
-- );

-- create table new_category(
-- 	description_id varchar(10) references update_game_description(id) on delete cascade on update cascade,
--     type varchar(20),
--     primary key(description_id,type)
-- );

-- create table update_game_description(
-- 	id varchar(10) primary key,
--     date date not null,
--     old_name varchar(100) not null,
--     old_price float,
--     old_discount float,
--     old_description varchar(255),
--     old_spec_minimum varchar(255),
--     old_spec_recommended varchar(255),
--     old_picture_1 mediumblob,
--     old_picture_2 mediumblob,
--     old_picture_3 mediumblob,
--     old_picture_4 mediumblob,
--     new_name varchar(100) not null,
--     new_price float,
--     new_discount float,
--     new_description varchar(255),
--     new_spec_minimum varchar(255),
--     new_spec_recommended varchar(255),
--     new_picture_1 mediumblob,
--     new_picture_2 mediumblob,
--     new_picture_3 mediumblob,
--     new_picture_4 mediumblob
-- );

-- create table update_game(
-- 	admin_id varchar(10) references admin(id) on delete cascade on update cascade,
--     game_name varchar(100) references game(name) on delete cascade on update cascade,
--     description_id varchar(10) references update_game_description(id) on delete cascade on update cascade,
--     primary key(admin_id,game_name,description_id)
-- );

-- create table added_code(
-- 	description_id varchar(10) references add_code_description(id) on delete cascade on update cascade,
--     code varchar(16),
--     primary key(description_id,code)
-- );

-- create table add_code_description(
-- 	id varchar(10) primary key,
--     date date not null
-- );

-- create table add_code(
-- 	game_name varchar(100) references game(name) on delete cascade on update cascade,
--     admin_id varchar(10) references admin(id) on delete cascade on update cascade,
--     description_id varchar(10) references add_code_description(id) on delete cascade on update cascade,
--     primary key(game_name,admin_id,description_id)
-- );

-- create table update_user_description(
-- 	id varchar(10) primary key,
--     date date not null,
--     old_membership_rank varchar(8) check(old_membership_rank='none' or old_membership_rank='bronze' or old_membership_rank='gold' or old_membership_rank='diamond' or old_membership_rank='special'),
--     old_membership_discount float check(0<=old_membership_discount and old_membership_discount<=5),
--     new_membership_rank varchar(8) check(new_membership_rank='none' or new_membership_rank='bronze' or new_membership_rank='gold' or new_membership_rank='diamond' or new_membership_rank='special'),
--     new_membership_discount float check(0<=new_membership_discount and new_membership_discount<=5)
-- );

-- create table update_user(
-- 	customer_id varchar(10) references customer(id) on delete cascade on update cascade,
--     admin_id varchar(10) references admin(id) on delete cascade on update cascade,
--     description_id varchar(10) references update_user_description(id) on delete cascade on update cascade,
--     primary key(customer_id,admin_id,description_id)
-- );