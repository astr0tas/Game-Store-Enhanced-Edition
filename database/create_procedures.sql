use game_store;

DROP PROCEDURE IF EXISTS addGame;
DELIMITER $$
CREATE PROCEDURE addGame(
	in name varchar(100),
    in price float,
    in discount float,
    in description text,
    in spec_minimum text,
    in spec_recommended text,
    in picture_1 text,
    in picture_2 text,
    in picture_3 text,
    in picture_4 text
)
BEGIN
	declare counter int;
    declare id varchar(10);
    select count(*) into counter from game;
    if counter<10 then
		set id:=concat("GAME0",counter+1);
    else
		set id:=concat("GAME",counter+1);
    end if;
    insert into game values(id,name,price,discount,description,0,spec_minimum,spec_recommended,load_file(picture_1),load_file(picture_2),load_file(picture_3),load_file(picture_4));
    select id;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS addCode;
DELIMITER $$
CREATE PROCEDURE addCode(
	in id varchar(10),
    in inCode varchar(16)
)
BEGIN
	if inCode not in(select code from activation_code) then
		insert into activation_code values(id,inCode,'available');
    end if;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS addTag;
DELIMITER $$
CREATE PROCEDURE addTag(
	in id varchar(10),
    in tag varchar(50)
)
BEGIN
	if tag not in (select category_type from belongs_to where game_id=id) then
		insert into belongs_to values(id,tag);
    end if;
END $$
DELIMITER ;

-- select * from game;
-- select * from belongs_to order by game_id;
-- select * from activation_code order by game_id;