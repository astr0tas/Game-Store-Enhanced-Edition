use game_store;

-- add customers section
insert into customer values('CUSTOMER01','Lê Văn B','b_le@gmail.com',null,0.0,'None',0,'b_le123','bLe0123');
insert into customer values('CUSTOMER02','John Wick','wicky@gmail.com',null,0.0,'None',0,'wicky123','Wicky123');
insert into customer values('CUSTOMER03','John Wick','wicky1@gmail.com',null,0.0,'None',0,'wicky1234','Wicky123');
insert into customer values('CUSTOMER04','John Wick','wicky2@gmail.com',null,0.0,'None',0,'wicky1235','Wicky123');
insert into customer values('CUSTOMER05','John Wick','wicky3@gmail.com',null,0.0,'None',0,'wicky1236','Wicky123');

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

-- set @picture_path:='F:/nam 3/web/btl/LTW_222/database/Pictures';
set @picture_path:='E:\\Projects\\Game_Store_2023\\database\\Pictures';
-- set @picture_path:='E:\\Projects\\Game_Store\\database\\Pictures';

-- add games section
insert into game values('GAME01','Elden Ring',59.99,0,'THE NEW FANTASY ACTION RPG.
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

insert into game values('GAME02','Resident Evil 4',59.99,0,'Survival is just the beginning.

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

insert into game values('GAME03','God of War',49.99,0.4,'Enter the Norse realm
His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Gods and monsters. It is in this harsh, unforgiving world that he must fight to survive… and teach his son to do the same.

Grasp a second chance
Kratos is a father again. As mentor and protector to Atreus, a son determined to earn his respect, he is forced to deal with and control the rage that has long defined him while out in a very dangerous world with his son.

Journey to a dark, elemental world of fearsome creatures
From the marble and columns of ornate Olympus to the gritty forests, mountains and caves of pre-Viking Norse lore, this is a distinctly new realm with its own pantheon of creatures, monsters and gods.

Engage in visceral, physical combat
With an over the shoulder camera that brings the player closer to the action than ever before, fights in God of War™ mirror the pantheon of Norse creatures Kratos will face: grand, gritty and grueling. A new main weapon and new abilities retain the defining spirit of the God of War series while presenting a vision of conflict that forges new ground in the genre.
PC FEATURES
High Fidelity Graphics
Striking visuals enhanced on PC. Enjoy true 4K resolution, on supported devices, [MU1] with unlocked framerates for peak performance. Dial in your settings via a wide range of graphical presets and options including higher resolution shadows, improved screen space reflections, the addition of GTAO and SSDO, and much more.

NVIDIA® DLSS and Reflex Support
Quality meets performance. Harness the AI power of NVIDIA Deep Learning Super Sampling (DLSS) to boost frame rates and generate beautiful, sharp images on select Nvidia GPUs. Utilize NVIDIA Reflex low latency technology allowing you to react quicker and hit harder combos with the responsive gameplay you crave on GeForce GPUs.

Controls Customization
Play your way. With support for the DUALSHOCK®4 and DUALSENSE® wireless controllers, a wide range of other gamepads, and fully customizable bindings for mouse and keyboard, you have the power to fine-tune every action to match your playstyle.

Ultra-wide Support
Immerse yourself like never before. Journey through the Norse realms taking in breathtaking vistas in panoramic widescreen. With 21:9 ultra-widescreen support, God of War™ presents a cinema quality experience that further expands the original seamless theatrical vision.',0,'Requires a 64-bit processor and operating system
OS: Windows 10 64-bit
Processor: Intel i5-2500k (4 core 3.3 GHz) or AMD Ryzen 3 1200 (4 core 3.1 GHz)
Memory: 8 GB RAM
Graphics: NVIDIA GTX 960 (4 GB) or AMD R9 290X (4 GB)
DirectX: Version 11
Storage: 70 GB available space
Additional Notes: DirectX feature level 11_1 required','Requires a 64-bit processor and operating system
OS: Windows 10 64-bit
Processor: Intel i5-6600k (4 core 3.5 GHz) or AMD Ryzen 5 2400 G (4 core 3.6 GHz)
Memory: 8 GB RAM
Graphics: NVIDIA GTX 1060 (6 GB) or AMD RX 570 (4 GB)
DirectX: Version 11
Storage: 70 GB available space
Additional Notes: DirectX feature level 11_1 required',load_file(concat(@picture_path,'/God of war/gow_1.jpg')),load_file(concat(@picture_path,'/God of war/gow_2.jpg')),load_file(concat(@picture_path,'/God of war/gow_3.jpg')),load_file(concat(@picture_path,'/God of war/gow_4.jpg')));

insert into game values('GAME04','Red Dead Redemption 2', 42.62, 0, 'America, 1899.

Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive. As deepening internal divisions threaten to tear the gang apart, Arthur must make a choice between his own ideals and loyalty to the gang who raised him.

Now featuring additional Story Mode content and a fully-featured Photo Mode, Red Dead Redemption 2 also includes free access to the shared living world of Red Dead Online, where players take on an array of roles to carve their own unique path on the frontier as they track wanted criminals as a Bounty Hunter, create a business as a Trader, unearth exotic treasures as a Collector or run an underground distillery as a Moonshiner and much more.

With all new graphical and technical enhancements for deeper immersion, Red Dead Redemption 2 for PC takes full advantage of the power of the PC to bring every corner of this massive, rich and detailed world to life including increased draw distances; higher quality global illumination and ambient occlusion for improved day and night lighting; improved reflections and deeper, higher resolution shadows at all distances; tessellated tree textures and improved grass and fur textures for added realism in every plant and animal.

Red Dead Redemption 2 for PC also offers HDR support, the ability to run high-end display setups with 4K resolution and beyond, multi-monitor configurations, widescreen configurations, faster frame rates and more.',0,'Requires a 64-bit processor and operating system
OS: Windows 10 - April 2018 Update (v1803)
Processor: Intel® Core™ i7-4770K / AMD Ryzen 5 1500X
Memory: 12 GB RAM
Graphics: Nvidia GeForce GTX 1060 6GB / AMD Radeon RX 480 4GB
Network: Broadband Internet connection
Storage: 150 GB available space
Sound Card: Direct X Compatible','Requires a 64-bit processor and operating system
OS: Windows 10 - April 2018 Update (v1803)
Processor: Intel® Core™ i7-4770K / AMD Ryzen 5 1500X
Memory: 12 GB RAM
Graphics: Nvidia GeForce GTX 1060 6GB / AMD Radeon RX 480 4GB
Network: Broadband Internet connection
Storage: 150 GB available space
Sound Card: Direct X Compatible', load_file(concat(@picture_path,'/Red Dead Redemption 2/RDR-pic1.jpg')),load_file(concat(@picture_path,'/Red Dead Redemption 2/RDR-pic2.jpg')), load_file(concat(@picture_path,'/Red Dead Redemption 2/RDR-pic3.jpg')), load_file(concat(@picture_path,'/Red Dead Redemption 2/RDR-pic4.jpg'))
);

insert into game values('GAME05','The Last of Us™ Part I', 59.99, 0, 'Experience the emotional storytelling and unforgettable characters in The Last of Us™, winner of over 200 Game of the Year awards.

In a ravaged civilization, where infected and hardened survivors run rampant, Joel, a weary protagonist, is hired to smuggle 14-year-old Ellie out of a military quarantine zone. However, what starts as a small job soon transforms into a brutal cross-country journey.',0, 'Requires a 64-bit processor and operating system
OS: Windows 10 (Version 1909 or Newer)
Processor: AMD Ryzen 5 1500X, Intel Core i7-4770K
Memory: 16 GB RAM
Graphics: AMD Radeon RX 470 (4 GB), AMD Radeon RX 6500 XT (4 GB), NVIDIA GeForce GTX 970 (4 GB), NVIDIA GeForce GTX 1050 Ti (4 GB)
Storage: 100 GB available space
Additional Notes: SSD Recommended','Requires a 64-bit processor and operating system
OS: Windows 10 (Version 1909 or Newer)
Processor: AMD Ryzen 5 3600X, Intel Core i7-8700
Memory: 16 GB RAM
Graphics: AMD Radeon RX 5700 XT (8 GB), AMD Radeon RX 6600 XT (8 GB), NVIDIA GeForce RTX 2070 SUPER (8 GB), NVIDIA GeForce RTX 3060 (8 GB)
Storage: 100 GB available space
Additional Notes: SSD Recommended', load_file(concat(@picture_path,'/The Last Of Us 1/tlou-1.jpg')), load_file(concat(@picture_path,'/The Last Of Us 1/tlou-2.jpg')), load_file(concat(@picture_path,'/The Last Of Us 1/tlou-3.jpg')), load_file(concat(@picture_path,'/The Last Of Us 1/tlou-4.jpg'))
);

insert into game values('GAME06','The Great War: Western Front™', 19.99, 0.3, 'The Great War: Western Front is the definitive World War 1 strategy game from Petroglyph, the makers of Command & Conquer™ Remastered & Star Wars™: Empire at War. Play a deciding role in history with this real-time tactical experience as you take charge in the pivotal Western Front from 1914 to 1919.

Pick your faction and lead your forces to victory, by directing your armies in gritty real-time battles and by guiding high-level decisions in turn-based strategic gameplay. Dig detailed trenches, research new technologies such as poison gas and tanks, and make decisions that will have a profound and lasting effect on your success. Think like a Commander to either relive history - or redefine it.

Discover unparalleled levels of strategic choice as you step into the role of both Theatre Commander and Field Commander.

As Theatre Commander, experience enthralling turn-based grand-strategy as you direct the deployment of forces, perform research and carefully consider how you disseminate your resources across the Western Front in a war won by inches. Alongside this, take up the mantle of Field Commander in dynamic real-time battles as you direct units to defeat your opponent, build trenches and perform direct assaults by sending your infantry over the top. Pick your battles and fight them your way to shape the course of history.', 4, 'Requires a 64-bit processor and operating system
OS: Windows 10 64bit
Processor: Intel i5-4590 / AMD FX-8350
Memory: 8 GB RAM
Graphics: NVIDIA GeForce GTX 780 / AMD Radeon R9 390
DirectX: Version 11
Storage: 13 GB available space
Additional Notes: SSD Recommended', 'Requires a 64-bit processor and operating system
OS: Windows 10/11 64bit
Processor: Intel i5-8600K / AMD Ryzen 5 2600
Memory: 16 GB RAM
Graphics: NVIDIA GeForce GTX 1060 / AMD Radeon RX 580
DirectX: Version 11
Storage: 13 GB available space
Additional Notes: SSD Recommended', load_file(concat(@picture_path,'/The Great War Western Front/greatwar-1.jpg')), load_file(concat(@picture_path,'/The Great War Western Front/greatwar-2.jpg')), load_file(concat(@picture_path,'/The Great War Western Front/greatwar-3.jpg')), load_file(concat(@picture_path,'/The Great War Western Front/greatwar-4.jpg')));

insert into game values('GAME07','Fallout 76', 31.99,0.1, 'Bethesda Game Studios, the award-winning creators of Skyrim and Fallout 4, welcome you to Fallout 76. Twenty-five years after the bombs fell, you and your fellow Vault Dwellers—chosen from the nation’s best and brightest – emerge into post-nuclear America on Reclamation Day, 2102. Play solo or join together as you explore, quest, build, and triumph against the wasteland’s greatest threats. Explore a vast wasteland, devastated by nuclear war, in this open-world multiplayer addition to the Fallout story. Experience the largest, most dynamic world ever created in the legendary Fallout universe.

The Mutation Invasion is here and mutations from Daily Ops\' missions have infected Public Events! Play a Mutated Public Event every hour for additional rewards and challenges, and jump back into Daily Ops to earn scaling rewards and experience a new variety of locations, enemies, and mutations.
Immersive Questlines and Engaging Characters
Uncover the secrets of West Virginia by playing through an immersive main quest, starting from the moment you leave Vault 76. Befriend or betray new neighbors who have come to rebuild, and experience Appalachia through the eyes of its residents.
Seasonal Scoreboard
Progress through a season with a completely free set of rewards like consumables, C.A.M.P. items and more, by completing limited-time challenges.
Multiplayer Roleplaying
Create your character with the S.P.E.C.I.A.L system and forge your own path and reputation in a new and untamed wasteland with hundreds of locations. Whether you journey alone or with friends, a new and unique Fallout adventure awaits.
Mountain splendorland
The story lives and breathes through the world of Fallout 76, which brings to life six distinct West Virginia regions. From the forests of Appalachia to the noxious crimson expanses of the Cranberry Bog, each area offers its own risks and rewards.
A New American Dream
Use the all-new Construction and Assembly Mobile Platform (C.A.M.P.) to build and craft anywhere in the world. Your C.A.M.P. will provide much-needed shelter, supplies, and safety. You can even set up shop to trade goods with other survivors.
Fallout Worlds
Play unique adventures in Appalachia with Fallout Worlds, which is an evolving set of features that give players the capability to play Fallout 76 in unique ways with customizable settings.', 3, 'Requires a 64-bit processor and operating system
OS: Windows 8.1/10 (64-bit versions)
Processor: Intel Core i5-6600k 3.5 GHz /AMD Ryzen 3 1300X 3.5 GHz or equivalent
Memory: 8 GB RAM
Graphics: NVIDIA GTX 780 3GB /AMD Radeon R9 285 2GB or equivalent
Network: Broadband Internet connection
Storage: 80 GB available space', 'Requires a 64-bit processor and operating system
OS: Windows 8.1/10 (64-bit versions)
Processor: Intel Core i7-4790 3.6 GHz /AMD Ryzen 5 1500X 3.5 GHz
Memory: 8 GB RAM
Graphics: NVIDIA GTX 970 4GB /AMD R9 290X 4GB
Network: Broadband Internet connection
Storage: 80 GB available space', load_file(concat(@picture_path,'/fallout76/f-1.jpg')),  load_file(concat(@picture_path,'/fallout76/f-2.jpg')),  load_file(concat(@picture_path,'/fallout76/f-3.jpg')),  load_file(concat(@picture_path,'/fallout76/f-4.jpg')));

insert into game values('GAME08','Hogwarts Legacy', 49.99, 0.1, 'Hogwarts Legacy is an open-world action RPG set in the world first introduced in the Harry Potter books. Embark on a journey through familiar and new locations as you explore and discover magical beasts, customize your character and craft potions, master spell casting, upgrade talents and become the wizard you want to be.



Experience Hogwarts in the 1800s. Your character is a student who holds the key to an ancient secret that threatens to tear the wizarding world apart. Make allies, battle Dark wizards, and ultimately decide the fate of the wizarding world. Your legacy is what you make of it. Live the Unwritten.', 4.1, 'Requires a 64-bit processor and operating system
OS: 64-bit Windows 10
Processor: Intel Core i5-6600 (3.3Ghz) or AMD Ryzen 5 1400 (3.2Ghz)
Memory: 16 GB RAM
Graphics: NVIDIA GeForce GTX 960 4GB or AMD Radeon RX 470 4GB
DirectX: Version 12
Storage: 85 GB available space
Additional Notes: SSD (Preferred), HDD (Supported), 720p/30 fps, Low Quality Settings', 'Requires a 64-bit processor and operating system
OS: 64-bit Windows 10
Processor: Intel Core i7-8700 (3.2Ghz) or AMD Ryzen 5 3600 (3.6 Ghz)
Memory: 16 GB RAM
Graphics: NVIDIA GeForce 1080 Ti or AMD Radeon RX 5700 XT or INTEL Arc A770
DirectX: Version 12
Storage: 85 GB available space
Additional Notes: SSD, 1080p/60 fps, High Quality Settings', load_file(concat(@picture_path,'/hogwart legacy/hl-1.jpg')), load_file(concat(@picture_path,'/hogwart legacy/hl-2.jpg')), load_file(concat(@picture_path,'/hogwart legacy/hl-3.jpg')), load_file(concat(@picture_path,'/hogwart legacy/hl-4.jpg')));

insert into game values('GAME09','Destiny 2', 10, 0, 'Dive into the world of Destiny 2 to explore the mysteries of the solar system and experience responsive first-person shooter combat. Unlock powerful elemental abilities and collect unique gear to customize your Guardian\'s look and playstyle. Enjoy Destiny 2’s cinematic story, challenging co-op missions, and a variety of PvP modes alone or with friends. Download for free today and write your legend in the stars.
An Immersive Story
You are a Guardian, defender of the Last City of humanity in a solar system under siege by infamous villains. Look to the stars and stand against the darkness. Your legend begins now.
Guardian Classes
Choose from the armored Titan, mystic Warlock, or swift Hunter.

Titan
Disciplined and proud, Titans are capable of both aggressive assaults and stalwart defenses. Set your hammer ablaze, crack the sky with lightning, and go toe-to-toe with any opponent. Your team will stand tall behind the strength of your shield.

Warlock
Warlocks weaponize the mysteries of the universe to sustain themselves and destroy their foes. Rain devastation on the battlefield and clear hordes of enemies in the blink of an eye. Those who stand with you will know the true power of the Light.

Hunter
Agile and daring, Hunters are quick on their feet and quicker on the draw. Fan the hammer of your golden gun, flow through enemies like the wind, or strike from the darkness. Find the enemy, take aim, and end the fight before it starts.
Cooperative and Competitive Multiplayer
Play with or against your friends and other Guardians in various PvE and PvP game modes.

Cooperative Multiplayer
Exciting co-op adventures teeming await with rare and powerful rewards. Dive into the story with missions, quests, and patrols. Put together a small fireteam and secure the chest at the end of a quick Strike. Or test your team\'s skill with countless hours of raid progression – the ultimate challenge for any fireteam. You decide where your legend begins.

Competitive Multiplayer
Face off against other players in fast-paced free-for-all skirmishes, team arenas, and PvE/PvP hybrid competitions. Mark special competitions like Iron Banner on your calendar and collect limited-time rewards before they\'re gone.
Exotic Weapons and Armor
Thousands of weapons, millions of options. Discover new gear combinations and define your own personal style. The hunt for the perfect arsenal begins.', 4.5, 'Requires a 64-bit processor and operating system
OS: Windows® 7 / Windows® 8.1 / Windows® 10 64-bit (latest Service Pack)
Processor: Intel® Core™ i3 3250 3.5 GHz or Intel Pentium G4560 3.5 GHz / AMD FX-4350 4.2 GHz
Memory: 6 GB RAM
Graphics: NVIDIA® GeForce® GTX 660 2GB or GTX 1050 2GB / AMD Radeon HD 7850 2GB
Network: Broadband Internet connection
Storage: 105 GB available space', 'Requires a 64-bit processor and operating system
OS: System Windows® 7 / Windows® 8.1 / Windows® 10 64-bit (latest Service Pack)
Processor: Processor Intel® Core™ i5 2400 3.4 GHz or i5 7400 3.5 GHz / AMD Ryzen R5 1600X 3.6 GHz
Memory: 8 GB RAM
Graphics: NVIDIA® GeForce® GTX 970 4GB or GTX 1060 6GB / AMD R9 390 8GB Memory 8 GB RAM
Network: Broadband Internet connection
Storage: 105 GB available space', load_file(concat(@picture_path,'/destiny2/destiny2-1.jpg')), load_file(concat(@picture_path,'/destiny2/destiny2-2.jpg')), load_file(concat(@picture_path,'/destiny2/destiny2-3.jpg')), load_file(concat(@picture_path,'/destiny2/destiny2-4.jpg')));

insert into game values('GAME10','MONSTER HUNTER RISE', 39.99, 0.2, 'Rise to the challenge and join the hunt! In Monster Hunter Rise, the latest installment in the award-winning and top-selling Monster Hunter series, you’ll become a hunter, explore brand new maps and use a variety of weapons to take down fearsome monsters as part of an all-new storyline. The PC release also comes packed with a number of additional visual and performance enhancing optimizations.


Ferocious monsters with unique ecologies
Hunt down a plethora of monsters with distinct behaviors and deadly ferocity. From classic returning monsters to all-new creatures inspired by Japanese folklore, including the flagship wyvern Magnamalo, you’ll need to think on your feet and master their unique tendencies if you hope to reap any of the rewards!


Choose your weapon and show your skills
Wield 14 different weapon types that offer unique gameplay styles, both up-close and from long range. Charge up and hit hard with the devastating Great Sword; dispatch monsters in style using the elegant Long Sword; become a deadly maelstrom of blades with the speedy Dual Blades; charge forth with the punishing Lance; or take aim from a distance with the Bow and Bowguns. These are just a few of the weapon types available in the game, meaning you’re sure to find the play style that suits you best.


Hunt, gather and craft your way to the top of the food chain
Each monster you hunt will provide materials that allow you to craft new weapons and armor and upgrade your existing gear. Go back out on the field and hunt even fiercer monsters and earn even better rewards! You can change your weapon at any of the Equipment Boxes any time, so the possibilities are limitless!


Hunt solo or team up to take monsters down
The Hunter Hub offers multiplayer quests where up to four players can team up to take on targets together. Difficulty scaling ensures that whether you go solo or hit the hunt as a full four-person squad, it’s always a fair fight.


Stunning visuals, unlocked framerate and other PC optimizations
Enjoy beautiful graphics at up 4K resolution, HDR with support for features including ultrawide monitors and an unlocked frame rate make to make this a truly immersive monster-hunting experience. Hunters will also get immediate access to a number of free title updates that include new monsters, quests, gear and more.


Enjoy an exciting new storyline set in Kamura Village
This serene locale is inhabited by a colorful cast of villagers who have long lived in fear of the Rampage - a catastrophic event where countless monsters attack the village all at once. 50 years after the last Rampage, you must work together with the villagers to face this trial.


Experience new hunting actions with the Wirebug
Wirebugs are an integral part of your hunter’s toolkit. The special silk they shoot out can be used to zip up walls and across maps, and can even be used to pull off special attacks unique to each of the 14 weapon types in the game.


Buddies are here to help
The Palico Felyne friends you already know and love from previous Monster Hunter adventures are joined by the brand new Palamute Canyne companions!


Wreak havoc by controlling monsters
Control raging monsters using Wyvern Riding and dish out massive damage to your targets!


Fend off hordes of monsters in The Rampage
Protect Kamura Village from hordes of monsters in an all-new quest type! Prepare for monster hunting on a scale like never before!', 4.7, 'Requires a 64-bit processor and operating system
OS: Windows 10 （64-bit）
Processor: Intel® Core™ i3-4130 or Core™ i5-3470 or AMD FX™-6100
Memory: 8 GB RAM
Graphics: NVIDIA® GeForce® GT 1030 (DDR4) or AMD Radeon™ RX 550
DirectX: Version 12
Network: Broadband Internet connection
Storage: 36 GB available space
Additional Notes: 1080p/30fps when graphics settings are set to "Low". System requirements subject to change during game development.', 'Requires a 64-bit processor and operating system
OS: Windows 10 （64-bit）
Processor: Intel® Core™ i5-4460 or AMD FX™-8300
Memory: 8 GB RAM
Graphics: NVIDIA® GeForce® GTX 1060 (VRAM 3GB) or AMD Radeon™ RX 570 (VRAM 4GB)
DirectX: Version 12
Network: Broadband Internet connection
Storage: 36 GB available space
Additional Notes: 1080p/30fps when graphics settings are set to "Average". System requirements subject to change during game development.', load_file(concat(@picture_path,'/monhun/monhun-1.jpg')), load_file(concat(@picture_path,'/monhun/monhun-2.jpg')), load_file(concat(@picture_path,'/monhun/monhun-3.jpg')), load_file(concat(@picture_path,'/monhun/monhun-4.jpg')));

insert into game values('GAME11','Riddle Joker', 19.99, 0.1, 'Riddle Joker is a Japanese-style visual novel produced by Yuzusoft, a Japanese developer of romance VNs.
The game won numerous awards on the year of its release in Japan for its art, music, and characters.

Story:

For decades, superpowers and psychic abilities were thought to be mere science fiction, but the discovery of a certain particle called the "Astron" at the end of the 20th century proved to the world that these wondrous phenomena were real. Nowadays, these abilities have been dubbed "astral abilities," with those who can wield them being knows as "Astrals."

Arihara Satoru is but an ordinary person living in this futuristic world.

However, beneath that guise, he\'s actually a secret agent working for an organization that uses Astrals.

One day, he receives a new mission:

Pose as a student and infiltrate a famous academy for Astrals.

After successfully transferring into the academy together with his sister Arihara Nanami, he settles into his new life there, meeting new friends like his classmates Mitsukasa Ayase and Nijouin Hazuki, and his upperclassman Shikibe Mayu, among others.

Until an unfortunate accident leads to Mitsukasa Ayase finding out his true identity! And in that situation, he also learns that she has her own big secret...', 4.8, 'OS: Windows 7 or newer
Processor: CPU 1.3GHz or more
Memory: 2 GB RAM
DirectX: Version 9.0c
Storage: 8 GB available space', 'Processor: CPU 2.66GHz or more
Memory: 4 GB RAM', load_file(concat(@picture_path,'/Riddle Joker/rj-1.jpg')), load_file(concat(@picture_path,'/Riddle Joker/rj-2.jpg')), load_file(concat(@picture_path,'/Riddle Joker/rj-3.jpg')), load_file(concat(@picture_path,'/Riddle Joker/rj-4.jpg')));

insert into game values('GAME12','Parquet', 15.99, 0, 'In the near future, a technology called Brain-Machine Interface connects the brain and machines. This technology brings about a new paradigm and opens the gates to the digitization of human memory itself.
From these new discoveries, "he" is born. An illegal experiment mixes thousands of memories into a single vessel, creating a wholly new being.
Having only the memories of others, doubts about who he truly is start arising in his mind, until he gathers the courage to go out into the world in search of his true self.
As he steps into the real world, he meets two girls, Kido Tsubasa and Ibaraki Rino.
Both kind souls whose lives have been touched by unscrupulous BMI experiments, just like him.
Learning to live together with their secrets, "he" and "they" will bring about big changes...', 3.8, 'OS: Windows 7 or newer
Processor: 1.7 GHz or above
Memory: 1 GB RAM
Graphics: 1GB VRAM', 'OS: Windows 7 or newer
Processor: 1.7 GHz or above
Memory: 1 GB RAM
Graphics: 1GB VRAM', load_file(concat(@picture_path,'/Parquet/parquet-1.jpg')), load_file(concat(@picture_path,'/Parquet/parquet-2.jpg')), load_file(concat(@picture_path,'/Parquet/parquet-3.jpg')), load_file(concat(@picture_path,'/Parquet/parquet-4.jpg')));

insert into game values('GAME13','Grand Theft Auto V', 19.49, 0.1, 'When a young street hustler, a retired bank robber and a terrifying psychopath find themselves entangled with some of the most frightening and deranged elements of the criminal underworld, the U.S. government and the entertainment industry, they must pull off a series of dangerous heists to survive in a ruthless city in which they can trust nobody, least of all each other.

Grand Theft Auto V for PC offers players the option to explore the award-winning world of Los Santos and Blaine County in resolutions of up to 4k and beyond, as well as the chance to experience the game running at 60 frames per second.

The game offers players a huge range of PC-specific customization options, including over 25 separate configurable settings for texture quality, shaders, tessellation, anti-aliasing and more, as well as support and extensive customization for mouse and keyboard controls. Additional options include a population density slider to control car and pedestrian traffic, as well as dual and triple monitor support, 3D compatibility, and plug-and-play controller support.

Grand Theft Auto V for PC also includes Grand Theft Auto Online, with support for 30 players and two spectators. Grand Theft Auto Online for PC will include all existing gameplay upgrades and Rockstar-created content released since the launch of Grand Theft Auto Online, including Heists and Adversary modes.

The PC version of Grand Theft Auto V and Grand Theft Auto Online features First Person Mode, giving players the chance to explore the incredibly detailed world of Los Santos and Blaine County in an entirely new way.

Grand Theft Auto V for PC also brings the debut of the Rockstar Editor, a powerful suite of creative tools to quickly and easily capture, edit and share game footage from within Grand Theft Auto V and Grand Theft Auto Online. The Rockstar Editor’s Director Mode allows players the ability to stage their own scenes using prominent story characters, pedestrians, and even animals to bring their vision to life. Along with advanced camera manipulation and editing effects including fast and slow motion, and an array of camera filters, players can add their own music using songs from GTAV radio stations, or dynamically control the intensity of the game’s score. Completed videos can be uploaded directly from the Rockstar Editor to YouTube and the Rockstar Games Social Club for easy sharing.

Soundtrack artists The Alchemist and Oh No return as hosts of the new radio station, The Lab FM. The station features new and exclusive music from the production duo based on and inspired by the game’s original soundtrack. Collaborating guest artists include Earl Sweatshirt, Freddie Gibbs, Little Dragon, Killer Mike, Sam Herring from Future Islands, and more. Players can also discover Los Santos and Blaine County while enjoying their own music through Self Radio, a new radio station that will host player-created custom soundtracks.', 4, 'Requires a 64-bit processor and operating system
OS: Windows 10 64 Bit, Windows 8.1 64 Bit, Windows 8 64 Bit, Windows 7 64 Bit Service Pack 1
Processor: Intel Core 2 Quad CPU Q6600 @ 2.40GHz (4 CPUs) / AMD Phenom 9850 Quad-Core Processor (4 CPUs) @ 2.5GHz
Memory: 4 GB RAM
Graphics: NVIDIA 9800 GT 1GB / AMD HD 4870 1GB (DX 10, 10.1, 11)
Storage: 72 GB available space
Sound Card: 100% DirectX 10 compatible', 'Requires a 64-bit processor and operating system
OS: Windows 10 64 Bit, Windows 8.1 64 Bit, Windows 8 64 Bit, Windows 7 64 Bit Service Pack 1
Processor: Intel Core i5 3470 @ 3.2GHz (4 CPUs) / AMD X8 FX-8350 @ 4GHz (8 CPUs)
Memory: 8 GB RAM
Graphics: NVIDIA GTX 660 2GB / AMD HD 7870 2GB
Storage: 72 GB available space
Sound Card: 100% DirectX 10 compatible', load_file(concat(@picture_path,'/GTA V/gta-1.jpg')), load_file(concat(@picture_path,'/GTA V/gta-2.jpg')), load_file(concat(@picture_path,'/GTA V/gta-3.jpg')), load_file(concat(@picture_path,'/GTA V/gta-4.jpg')));

-- add categories to games section
insert into belongs_to values('GAME01','Action RPG'),('GAME02','Third-Person Shooter'),('GAME02','Story-Rich');
insert into belongs_to values('GAME03','Story-Rich'),('GAME03','Hack & Slash'),('GAME03','Action RPG');
insert into belongs_to values('GAME09', 'First-Person Shooter'), ('GAME07', 'First-Person Shooter'), ('GAME08', 'Adventure RPG'), ('GAME08', 'Story-Rich');
insert into belongs_to values('GAME10','Story-Rich'),('GAME10','Hack & Slash'), ('GAME10','Action RPG');
insert into belongs_to values('GAME04','Story-Rich'),('GAME04','Third-Person Shooter'), ('GAME04','Adventure RPG');
insert into belongs_to values('GAME06','Strategy RPG'),('GAME06','Turn-Based');
insert into belongs_to values('GAME05','Story-Rich'),('GAME05','Adventure RPG'), ('GAME05','Third-Person Shooter');
insert into belongs_to values('GAME11', 'Visual Novel'), ('GAME11', 'Story-Rich');
insert into belongs_to values('GAME12', 'Visual Novel'), ('GAME12', 'Story-Rich');
insert into belongs_to values('GAME13', 'Action RPG'), ('GAME13', 'First-Person Shooter');

-- add activation codes section
insert into activation_code(game_id,code) values('GAME01','SQT8CXG8VWKBP9QB'),('GAME01','LV47LGEFPY2PXZ67'),('GAME01','KYZXNH7B95FTG5RL'),
('GAME02','MTPAJHMJMBPVHR9X'),('GAME02','N56GEPPGFHB7VVKE'),('GAME02','ZR2ZXN4QXDTWJQ7U');
insert into activation_code values('GAME01','SQT8CXG8VWKBP9Q1','used'),('GAME01','LV47LGEFPY2PXZ6F','used'),('GAME01','KYZXNH7B95FTG5RC','used'),
('GAME02','MTPAJHMJMBPVHR9W','used'),('GAME02','N56GEPPGFHB7VVKA','used'),('GAME02','ZR2ZXN4QXDTWJQ79','used');
insert into activation_code(game_id,code) values('GAME03','ZUGJX32CGJTLXVXX'),('GAME03','WVTKJKK8VL3ALFXF'),('GAME03','DP44F8XHCGEBQSNB');
insert into activation_code values('GAME03','ZUGJX32CGJTLXVXH','used'),('GAME03','WVTKJKK8VL3ALFXO','used'),('GAME03','DP44F8XHCGEBQSNI','used');
insert into activation_code(game_id,code) values('GAME09', 'ORBZW5U6REET76TM'), ('GAME07','2Y6ZV5CRYLGDRMRO'), ('GAME07','VG5KTJFGXGHIFRAK');
insert into activation_code(game_id,code) values('GAME08', 'STEU31JSYXBKA8O3'), ('GAME08','N6LVQVYTSBNTBI8K'), ('GAME08','VCH6HPTJGCMQ77Q5');
insert into activation_code(game_id,code) values('GAME10', 'LRBCO6ANBOEOKCOF'), ('GAME04','CQKP1QOI2E98DHHC');
insert into activation_code(game_id,code) values('GAME06', 'EO8BND6M67HDD7ST'), ('GAME05','N04NAGGQT2NIZPC9'), ('GAME05','7Y8BRVQD5FYJACOI');
insert into activation_code(game_id,code) values('GAME11', 'S1FJ8NFW4EYVE33D'), ('GAME12','XJMPMDRHI2A3OD04'), ('GAME13','2661A0VRJMBJABHS');
insert into activation_code values ('GAME09', 'UEVY8Y944GITQNLK', 'used'), ('GAME09', 'LFDPNFUJ08J0ZFHJ', 'used'), ('GAME07','3KNE1VD7XWDDK46N', 'used');
insert into activation_code values ('GAME08', '46QN0IRXT8NMS7U8', 'used'), ('GAME10', 'ZT1VZSV776G09ZY5', 'used');
insert into activation_code values ('GAME04', 'HVYD219XROCELSH3', 'used'), ('GAME04', 'AEOSR8SLXC2EOKG4', 'used'), ('GAME04','IP6RA1PWE95YU4GH','used');
insert into activation_code values ('GAME06', 'DAA4XQ8FY4OXF32X', 'used'), ('GAME05', 'SKFZA1NRWA0TKJ24', 'used'), ('GAME05','K6XSEDL9HATQSQ2S','used');
insert into activation_code values ('GAME11', 'Z2KI5Y03B491UB1F', 'used'), ('GAME12','EEWHOUYQAKJ25QQR', 'used'), ('GAME13','1UE640ECX4EE6X52', 'used');


-- add purchase_history
insert into purchase_history values('CUSTOMER01','GAME04','HVYD219XROCELSH3','QM3J7S7V48'),
('CUSTOMER01','GAME01','SQT8CXG8VWKBP9Q1','6CFQYWLV5S'),
('CUSTOMER01','GAME01','LV47LGEFPY2PXZ6F','7YZLO77T1M'),
('CUSTOMER01','GAME01','KYZXNH7B95FTG5RC','5B4180VD4J'),
('CUSTOMER01','GAME03','ZUGJX32CGJTLXVXH','IXQZCPG0A8'),
('CUSTOMER01','GAME03','WVTKJKK8VL3ALFXO','YZV9DV5CKM'),
('CUSTOMER01','GAME03','DP44F8XHCGEBQSNI','F6XN96I8KY'),
('CUSTOMER01','GAME08','46QN0IRXT8NMS7U8','00FUSNNXUR'),
('CUSTOMER01','GAME07','3KNE1VD7XWDDK46N','GSNZCXWTWC'),
('CUSTOMER01','GAME05','SKFZA1NRWA0TKJ24','IW9MNCBZKR');


-- add purchase_history_description
insert into purchase_history_description values('QM3J7S7V48','Online banking','2023-04-17'),
('6CFQYWLV5S','Online banking','2023-04-17'),
('7YZLO77T1M','Online banking','2023-04-16'),
('5B4180VD4J','Online banking','2023-04-15'),
('IXQZCPG0A8','Online banking','2023-04-14'),
('YZV9DV5CKM','Online banking','2023-04-13'),
('F6XN96I8KY','Online banking','2023-04-17'),
('00FUSNNXUR','Online banking','2023-04-15'),
('GSNZCXWTWC','Online banking','2023-04-16'),
('IW9MNCBZKR','Online banking','2023-04-13');


-- select * from game;
-- select * from game join activation_code on game.name=activation_code.game_name;
-- select name,picture_1,price,count(*) as total_sale from game join activation_code on game.name=activation_code.game_name where status='used' group by name order by total_sale desc,name limit 5;