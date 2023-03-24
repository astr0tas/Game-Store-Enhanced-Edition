use game_store;

-- add customers section
insert into customer values('CUSTOMER01','Lê Văn B','b_le@gmail.com',null,0.0,'none',0,'b_le123','bLe0123');

-- add admins section
insert into admin values('ADMIN01','Nguyễn Văn A','a_nguyen@gmail.com','0123456789',null,'a_nguyen123','aNguyen0123');

-- add categories section
insert into category values('Arcade & Rhythm'),
('Fighting & Martial Arts'),
('First-Person Shooter'),
('Hack & Slash'),
('Platformer & Runner'),
('Third-Person Shooter'),
('Action RPG'),
('Adventure RPG'),
('JRPG'),
('Party-Based'),
('Rogue-Like'),
('Strategy RPG'),
('Turn-Based'),
('Car & Board'),
('City & Settlement'),
('Grand & 4X'),
('Military'),
('Real-Time Strategy'),
('Tower Defense'),
('Turn-Based Strategy'),
('Casual'),
('Hidden Object'),
('Metroidvania'),
('Puzzle'),
('Story-Rich'),
('Visual Novel'),
('Building & Automation'),
('Dating'),
('Farming & Crafting'),
('Hobby & Job'),
('Life & Immersive'),
('Sandbox & Physics'),
('Space & Flight'),
('Fishing & Hunting'),
('Individual Sports'),
('Racing'),
('Racing Sim'),
('Sports Sim'),
('Team Sports');

set @picture_path:='E:/Projects/Game_Store_2023/database/Pictures';

-- add games section
insert into game values('Elden Ring',59.99,0,'THE NEW FANTASY ACTION RPG.
Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.
• A Vast World Full of Excitement
A vast world where open fields with a variety of situations and huge dungeons with complex and three-dimensional designs are seamlessly connected. As you explore, the joy of discovering unknown and overwhelming threats await you, leading to a high sense of accomplishment.
• Create your Own Character
In addition to customizing the appearance of your character, you can freely combine the weapons, armor, and magic that you equip. You can develop your character according to your play style, such as increasing your muscle strength to become a strong warrior, or mastering magic.
• An Epic Drama Born from a Myth
A multilayered story told in fragments. An epic drama in which the various thoughts of the characters intersect in the Lands Between.
• Unique Online Play that Loosely Connects You to Others
In addition to multiplayer, where you can directly connect with other players and travel together, the game supports a unique asynchronous online element that allows you to feel the presence of others.',0,'Requires a 64-bit processor and operating system
OS: Windows 10
Processor: INTEL CORE I5-8400 or AMD RYZEN 3 3300X
Memory: 12 GB RAM
Graphics: NVIDIA GEFORCE GTX 1060 3 GB or AMD RADEON RX 580 4 GB
DirectX: Version 12
Storage: 60 GB available space
Sound Card: Windows Compatible Audio Device','Requires a 64-bit processor and operating system
OS: Windows 10/11
Processor: INTEL CORE I7-8700K or AMD RYZEN 5 3600X
Memory: 16 GB RAM
Graphics: NVIDIA GEFORCE GTX 1070 8 GB or AMD RADEON RX VEGA 56 8 GB
DirectX: Version 12
Storage: 60 GB available space
Sound Card: Windows Compatible Audio Device',load_file(concat(@picture_path,'/Elden ring/Elden_ring_pic1.jpg')),load_file(concat(@picture_path,'/Elden ring/Elden_ring_pic2.jpg')),load_file(concat(@picture_path,'/Elden ring/Elden_ring_pic3.jpg')),load_file(concat(@picture_path,'/Elden ring/Elden_ring_pic4.jpg')));

insert into game values('Resident Evil 4',59.99,0,'Survival is just the beginning.

Six years have passed since the biological disaster in Raccoon City.
Agent Leon S. Kennedy, one of the survivors of the incident, has been sent to rescue the president\'s kidnapped daughter.
He tracks her to a secluded European village, where there is something terribly wrong with the locals.
And the curtain rises on this story of daring rescue and grueling horror where life and death, terror and catharsis intersect.

Featuring modernized gameplay, a reimagined storyline, and vividly detailed graphics,
Resident Evil 4 marks the rebirth of an industry juggernaut.

Relive the nightmare that revolutionized survival horror.Survival is just the beginning.

Six years have passed since the biological disaster in Raccoon City.
Agent Leon S. Kennedy, one of the survivors of the incident, has been sent to rescue the president\'s kidnapped daughter.
He tracks her to a secluded European village, where there is something terribly wrong with the locals.
And the curtain rises on this story of daring rescue and grueling horror where life and death, terror and catharsis intersect.

Featuring modernized gameplay, a reimagined storyline, and vividly detailed graphics,
Resident Evil 4 marks the rebirth of an industry juggernaut.

Relive the nightmare that revolutionized survival horror.',0,'Requires a 64-bit processor and operating system
OS: Windows 10 (64 bit)
Processor: AMD Ryzen 3 1200 / Intel Core i5-7500
Memory: 8 GB RAM
Graphics: AMD Radeon RX 560 with 4GB VRAM / NVIDIA GeForce GTX 1050 Ti with 4GB VRAM
DirectX: Version 12
Network: Broadband Internet connection
Additional Notes: Estimated performance (when set to Prioritize Performance): 1080p/45fps. ・Framerate might drop in graphics-intensive scenes. ・AMD Radeon RX 6700 XT or NVIDIA GeForce RTX 2060 required to support ray tracing.','Requires a 64-bit processor and operating system
OS: Windows 10 (64 bit)/Windows 11 (64 bit)
Processor: AMD Ryzen 5 3600 / Intel Core i7 8700
Memory: 16 GB RAM
Graphics: AMD Radeon RX 5700 / NVIDIA GeForce GTX 1070
DirectX: Version 12
Network: Broadband Internet connection
Additional Notes: Estimated performance: 1080p/60fps ・Framerate might drop in graphics-intensive scenes. ・AMD Radeon RX 6700 XT or NVIDIA GeForce RTX 2070 required to support ray tracing.',load_file(concat(@picture_path,'/Resident Evil 4/Resident_evil_4_pic1.jpg')),load_file(concat(@picture_path,'/Resident Evil 4/Resident_evil_4_pic2.jpeg')),load_file(concat(@picture_path,'/Resident Evil 4/Resident_evil_4_pic3.jpg')),load_file(concat(@picture_path,'/Resident Evil 4/Resident_evil_4_pic4.jpg')));

-- add categories to games section
insert into belongs_to values('Elden Ring','Action RPG'),('Resident Evil 4','Third-Person Shooter'),('Resident Evil 4','Story-Rich');

-- add activation codes section
insert into activation_code(game_name,code) values('Elden Ring','SQT8CXG8VWKBP9QB'),('Elden Ring','LV47LGEFPY2PXZ67'),('Elden Ring','KYZXNH7B95FTG5RL'),
('Resident Evil 4','MTPAJHMJMBPVHR9X'),('Resident Evil 4','N56GEPPGFHB7VVKE'),('Resident Evil 4','ZR2ZXN4QXDTWJQ7U');

-- select * from activation_code;