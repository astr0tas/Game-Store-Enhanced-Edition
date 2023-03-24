==>> Before you set up MySQL database for the project, please follow these steps.

Step 1: Locate config file of MySQL, which at default is C:\ProgramData\MySQL\MySQL Server 8.0\my.
	(ProgramData is not visible by default, you will need to check the 'Hidden items' box; 'my' file is not writable by default, you will need to allow the current user of your PC to have the write permission).
Step 2: Press Ctrl + F and find [mysqld].
Step 3: Past this code 'max_allowed_packet=1024M' below it, this will allow you to insert pictures that are <1024MB.
Step 4: Find 'secure-file-priv'; if it has a value, set it to "", this will allow you to insert images/files freely from anywhere.
Step 5: Save and exit the file.
Step 6: Press Window + R and search for services.msc, locate MySQL80 and restart it.
Step 7: Open the seeding_data.sql file and change the value of @path to your own directory of the project (it should be: <your_dir>/Game_Store_2023/database/Pictures).
Step 8: You are ready to go!


==>> Next run the create_manager.sql file first then create_database.sql and finally seeding_data.sql

==>> Enjoy the pain!
