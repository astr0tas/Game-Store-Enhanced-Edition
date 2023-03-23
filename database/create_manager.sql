create user 'owner'@'localhost' identified with mysql_native_password by 'owner123';

grant all privileges on game_store.* to 'owner'@'localhost';

grant file on *.* to 'owner'@'localhost';