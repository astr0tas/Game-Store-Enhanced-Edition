	use game_store;
	
	DROP PROCEDURE IF EXISTS buyGame;
	DELIMITER $$
	CREATE PROCEDURE buyGame(
		in customerID varchar(10),
		in total double,
		in InMethod varchar(15),
		out OutStatus bool,
		out OutDeleted bool,
		out OutNotEnough bool
	)
	BEGIN
        declare idLoop varchar(10);
        declare currentAmont int;
        declare counter int;
        
        declare i int;
        declare spending double;
        declare CustomerRank varchar(8);
        declare selectedCode varchar(16);
        DECLARE generated_string VARCHAR(10);
        
        
        DECLARE done INT DEFAULT FALSE;
        declare reader cursor for select game_id from shopping_cart where customer_id=customerID;
        DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
        
        set OutStatus=null;
        set OutDeleted=null;
        set OutNotEnough=null;
        
        open reader;
        
        read_loop_1: loop
			fetch reader into idLoop;
            IF done THEN
				LEAVE read_loop_1;
			END IF;
            set currentAmont=null;
            select exists (select * from game where game.id=idLoop) into OutDeleted;
			set OutDeleted = not OutDeleted;
            if OutDeleted then
				set done=true;
			else
				select game.status into OutStatus from game where game.id=idLoop;
                if OutStatus then
					select amount into currentAmont from shopping_cart where customer_id=customerID and game_id=idLoop;
                    select count(*) into counter from activation_code where game_id = idLoop and status = 'available';
                    if currentAmont>counter then
						set done=true;
                        set OutNotEnough=true;
					else
						set OutNotEnough=false;
                    end if;
                else
					set done=true;
                end if;
            end if;
        end loop;
        
        close reader;
        
        if OutStatus=true and OutDeleted=false and OutNotEnough=false then
			set done=false;
		
			open reader;
        
			read_loop_2: loop
				FETCH reader INTO idLoop;
				IF done THEN
					LEAVE read_loop_2;
				END IF;
                select amount into currentAmont from shopping_cart where customer_id=customerID and game_id=idLoop;
                set i=0;
                buy: loop
					if i=currentAmont then
						leave buy;
                    end if;
                    CALL generate_random_string(generated_string);
                    WHILE generated_string in (select description_id from purchase_history) DO
						CALL generate_random_string(generated_string);
					END WHILE;
                    select code into selectedCode from activation_code where game_id=idLoop and status='available' limit 1;
                    update activation_code set status='used' where code=selectedCode;
                    insert into purchase_history_description values(generated_string,InMethod,now());
                    insert into purchase_history values(customerID,idLoop,selectedCode,generated_string);
                    set i=i+1;
                end loop;
            end loop;
            
            close reader;
            
            update customer set total_spending=ROUND(total_spending+total,2) where id=customerID;
            select total_spending into spending from customer where id=customerID;
            select membership_rank into CustomerRank from customer where id=customerID;
            
            if CustomerRank!='Special' then
				if spending>=150 and spending<300 then
					update customer set membership_rank='Silver',membership_discount=1 where customer.id=customerID;
				elseif spending>=300 and spending<600 then
					update customer set membership_rank='Gold',membership_discount=2 where customer.id=customerID;
				else
					update customer set membership_rank='Diamond',membership_discount=3 where customer.id=customerID;
				end if;
            end if;
            
            delete from shopping_cart where customer_id=customerID;
            delete from wishlist where customer_id=customerID;
        end if;
        
	--     select @OutDeleted, @OutStatus, @OutNotEnough;
	END $$
	DELIMITER ;

	DROP PROCEDURE IF EXISTS adjustAmount;
	DELIMITER $$
	CREATE PROCEDURE adjustAmount(
		in gameID varchar(10),
		in customerID varchar(10),
		in mode int,
		in InAmount int,
		out OutStatus bool,
		out OutDeleted bool,
		out OutNotEnough bool
	)
	BEGIN
		declare counter int;
		declare currentAmount int;
        
        set OutStatus=null;
        set OutDeleted=null;
        set OutNotEnough=null;
        
		select exists (select * from game where game.id=gameID) into OutDeleted;
		set OutDeleted = not OutDeleted;
		if NOT OutDeleted then
			select game.status into OutStatus from game where game.id=gameID;
			if OutStatus then
				if mode = 1 then
					update shopping_cart set amount = amount - 1 where game_id = gameID and customer_id = customerID and amount > 1;
				elseif mode = 2 then
					select count(*) into counter from activation_code where game_id = gameID and status = 'available';
					select amount into currentAmount from shopping_cart where game_id = gameID and customer_id = customerID;
					
					if currentAmount = counter then
						set OutNotEnough = true;
					else
						set OutNotEnough = false;
						update shopping_cart set amount = amount + 1 where game_id = gameID and customer_id = customerID;
					end if;
				else
					select count(*) into counter from activation_code where game_id = gameID and status = 'available';
					if InAmount > counter then
						set OutNotEnough = true;
					else
						set OutNotEnough = false;
						update shopping_cart set amount = InAmount where game_id = gameID and customer_id = customerID;
					end if;
				end if;
			end if;
		end if;
	--     select @OutDeleted, @OutStatus, @OutNotEnough;
	END $$
	DELIMITER ;

	DROP PROCEDURE IF EXISTS addToWishlist;
	DELIMITER $$
	CREATE PROCEDURE addToWishlist(
		in gameID varchar(10),
		in customerID varchar(10),
		out OutStatus bool,
		out OutDeleted bool
	)
	BEGIN
		set OutStatus=null;
        set OutDeleted=null;
        
		select exists (select * from game where game.id=gameID) into OutDeleted;
		set OutDeleted:= not OutDeleted;
		if not OutDeleted then
			select game.status into OutStatus from game where game.id=gameID;
			if OutStatus then
				insert into wishlist values(gameID,customerID);
			end if;
		end if;
-- 		select @OutDeleted, @OutStatus;
	END $$
	DELIMITER ;

	DROP PROCEDURE IF EXISTS addToCart;
	DELIMITER $$
	CREATE PROCEDURE addToCart(
		in gameID varchar(10),
		in customerID varchar(10),
		out OutStatus bool,
		out OutRemain bool,
		out OutDeleted bool
	)
	BEGIN
		declare remains int;
        
        set OutStatus=null;
        set OutDeleted=null;
        set OutRemain=null;
        
		select exists (select * from game where game.id=gameID) into OutDeleted;
		set OutDeleted:= not OutDeleted;
		if not OutDeleted then
			set OutRemain:=true;
			select game.status into OutStatus from game where game.id=gameID;
			if OutStatus then
				select count(*) as count into remains from activation_code where game_id=gameID and status='Available';
				if remains != 0 then
					insert into shopping_cart values(gameID,customerID,'1');
				else
					set OutRemain:=false;
				end if;
			end if;
		end if;
-- 		select @OutDeleted, @OutStatus,@OutRemain;
	END $$
	DELIMITER ;

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
-- 		select @id;
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