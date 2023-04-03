create user 'owner'@'localhost' identified with mysql_native_password by 'owner123';
-- Or use this line if the above one does not work
-- create user 'owner'@'localhost' identified by 'owner123';

grant all privileges on game_store.* to 'owner'@'localhost';

grant file on *.* to 'owner'@'localhost';