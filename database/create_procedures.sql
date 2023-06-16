use game_store;

DROP PROCEDURE IF EXISTS addGame;
DELIMITER $$
CREATE PROCEDURE addGame(
	in Inname varchar(100),
    in Inprice float,
    in Indiscount float,
    in Indescription text,
    in Inspec_minimum text,
    in Inspec_recommended text,
    in Inpicture_1 text,
    in Inpicture_2 text,
    in Inpicture_3 text,
    in Inpicture_4 text,
    out id varchar(10)
)
BEGIN
	declare counter int;
    select cast(substring(game.id,5) as unsigned) as value into counter from game order by game.id desc limit 1;
    if counter<10 then
		set id:=concat("GAME0",counter+1);
    else
		set id:=concat("GAME",counter+1);
    end if;
    if Inprice is not null then
		insert into game(id,name,price,discount,description,spec_minimum,spec_recommended,picture_1,picture_2,picture_3,picture_4) values(id,Inname,Inprice,Indiscount,Indescription,Inspec_minimum,Inspec_recommended,Inpicture_1,Inpicture_2,Inpicture_3,Inpicture_4);
	else
		insert into game(id,name,price,discount,description,spec_minimum,spec_recommended,picture_1,picture_2,picture_3,picture_4,status) values(id,Inname,null,Indiscount,Indescription,Inspec_minimum,Inspec_recommended,Inpicture_1,Inpicture_2,Inpicture_3,Inpicture_4,false);
    end if;
    select @id;
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

DROP PROCEDURE IF EXISTS updateGame;
DELIMITER $$
CREATE PROCEDURE updateGame(
	in id varchar(10),
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
	update game set game.name=name,game.price=price,game.discount=discount where game.id=id;
    if price is null then
		update game set game.status=false where game.id=id;
    end if;
    if description is not null then
		update game set game.description=description where game.id=id;
    end if;
    if spec_minimum is not null then
		update game set game.spec_minimum=spec_minimum where game.id=id;
    end if;
    if spec_recommended is not null then
		update game set game.spec_recommended=spec_recommended where game.id=id;
    end if;
    if picture_1 is not null then
		update game set game.picture_1=picture_1 where game.id=id;
    end if;
    if picture_2 is not null then
		update game set game.picture_2=picture_2 where game.id=id;
    end if;
    if picture_3 is not null then
		update game set game.picture_3=picture_3 where game.id=id;
    end if;
    if picture_4 is not null then
		update game set game.picture_4=picture_4 where game.id=id;
    end if;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS updateAdminInfo;
DELIMITER $$
CREATE PROCEDURE updateAdminInfo(
	in id varchar(10),
	in name varchar(100),
    in email varchar(20),
    in phone varchar(10),
    in address varchar(150),
    in userpassword varchar(20),
	in image text
)
BEGIN
	update admin set admin.name=name where admin.id=id;
    update admin set admin.email=email where admin.id=id;
    update admin set admin.phone=phone where admin.id=id;
    update admin set admin.address=address where admin.id=id;
    if userpassword is not null then
		update admin set admin.userpassword=userpassword where admin.id=id;
    end if;
    if image is not null then
		update admin set admin.image=image where admin.id=id;
    end if;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS addCustomer;
DELIMITER $$
CREATE PROCEDURE addCustomer(
	in name varchar(100),
    in email varchar(50),
    in phone varchar(10),
    in username varchar(20),
    in userpassword varchar(20),
    out usedEmail varchar(50),
    out usedUsername varchar(20)
)
BEGIN
	declare numberOfCusomer int;
    set usedEmail:=null;
    set usedUsername:=null;
	if email in (select customer.email from customer) then
		set usedEmail:=email;		
    end if;
    if username in (select customer.username from customer) then
		set usedUsername:=username;		
    end if;
    if usedEmail is null and usedUsername is null then
        select cast(substring(customer.id,9) as unsigned) as value into numberOfCusomer from customer order by customer.id desc limit 1;
		if numberOfCusomer<10 then
			insert into customer values(concat("CUSTOMER0",numberOfCusomer+1),name,email,phone,0.0,'None',0,username,userpassword,null);
		else
			insert into customer values(concat("CUSTOMER",numberOfCusomer+1),name,email,phone,0.0,'None',0,username,userpassword,null);
    end if;
    end if;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS updateCustomerInfo;
DELIMITER $$
CREATE PROCEDURE updateCustomerInfo(
	in id varchar(10),
	in name varchar(100),
    in email varchar(20),
    in phone varchar(10),
    in userpassword varchar(20),
	in image text
)
BEGIN
	update customer set customer.name=name where customer.id=id;
    update customer set customer.email=email where customer.id=id;
    update customer set customer.phone=phone where customer.id=id;
    if userpassword is not null then
		update customer set customer.userpassword=userpassword where customer.id=id;
    end if;
    if image is not null then
		update customer set customer.image=image where customer.id=id;
    end if;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS generate_random_string;
DELIMITER $$
CREATE PROCEDURE generate_random_string(OUT random_string VARCHAR(10))
BEGIN
    SET @chars := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    SET @len := 10;
    SET random_string := '';
    
    WHILE @len > 0 DO
        SET random_string := CONCAT(random_string, SUBSTRING(@chars, FLOOR(1 + RAND() * 36), 1));
        SET @len := @len - 1;
    END WHILE;
END $$
DELIMITER ;

-- DROP PROCEDURE IF EXISTS buyGame;
-- DELIMITER $$
-- CREATE PROCEDURE buyGame(
-- 	IN customer_id varchar(10),
--     in game_id varchar(10),
--     in method varchar(15)
-- )
-- BEGIN
-- 	DECLARE generated_string VARCHAR(10);
--     declare spending double;
--     declare gameCode varchar(16);
--     CALL generate_random_string(generated_string);
--     
--     WHILE generated_string in (select description_id from purchase_history) DO
-- 		CALL generate_random_string(generated_string);
--     END WHILE;
--     
--     select price into spending from game where game.id=game_id;
--     
--     select activation_code.code into gameCode from activation_code where activation_code.game_id=game_id limit 1;
--     
--     delete from shopping_cart where shopping_cart.customer_id=customer_id and shopping_cart.game_id=game_id;
--     
--     update customer set total_spending=ROUND(total_spending+spending-spending*membership_discount/100.0,2) where customer.id=customer_id;
--     
--     insert into purchase_history values(customer_id,game_id,gameCode,generated_string);
--     
--     insert into purchase_history_description values(generated_string,method,CURDATE());
--     
--     select total_spending into spending from customer where customer.id=customer_id;
--     
--     if spending >=50 and spending<100 then
-- 		update customer set membership_rank='Silver',membership_discount=1 where customer.id=customer_id;
--     elseif spending>=100 and spending<200 then
-- 		update customer set membership_rank='Gold',membership_discount=2 where customer.id=customer_id;
--     else
-- 		update customer set membership_rank='Diamond',membership_discount=3 where customer.id=customer_id;
--     end if;
--     
--     update activation_code set status='used' where activation_code.game_id=game_id and activation_code.code=gameCode;
-- END $$
-- DELIMITER ;