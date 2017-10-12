function initShipTypes( )
{
  var data = [ '[',
///////////////////////////////////////////////////////////// titans /////////////////////////////////////////////////
'{"I": 11567,  "N": "Avatar",                                       "G": "Titan",                      "O": 101 },',
'{"I": 3764,   "N": "Leviathan",                                    "G": "Titan",                      "O": 103 },',
'{"I": 671,    "N": "Erebus",                                       "G": "Titan",                      "O": 102 },',
'{"I": 23773,  "N": "Ragnarok",                                     "G": "Titan",                      "O": 104 },',
                                                                                                       
///////////////////////////////////////////////////////////// supercarriers  /////////////////////////////////////////////////
'{"I": 3514,   "N": "Revenant",                                     "G": "Supercarrier",               "O": 201 },',
'{"I": 3628,   "N": "Nation",                                       "G": "Supercarrier",               "O": 202 },',
'{"I": 23919,  "N": "Aeon",                                         "G": "Supercarrier",               "O": 221 },',
'{"I": 23917,  "N": "Wyvern",                                       "G": "Supercarrier",               "O": 231 },',
'{"I": 23913,  "N": "Nyx",                                          "G": "Supercarrier",               "O": 241 },',
'{"I": 22852,  "N": "Hel",                                          "G": "Supercarrier",               "O": 251 },',
                                                                                                       
///////////////////////////////////////////////////////////// dreads  /////////////////////////////////////////////////
'{"I": 19720,  "N": "Revelation",                                   "G": "Dreadnought",                "O": 301 },',
'{"I": 19726,  "N": "Phoenix",                                      "G": "Dreadnought",                "O": 302 },',
'{"I": 19724,  "N": "Moros",                                        "G": "Dreadnought",                "O": 303 },',
'{"I": 19722,  "N": "Naglfar",                                      "G": "Dreadnought",                "O": 304 },',
                                                                                                       
///////////////////////////////////////////////////////////// rorqual  /////////////////////////////////////////////////
'{"I": 28352,  "N": "Rorqual",                                      "G": "Capital Industrial Ship",    "O": 400 },',
                                                                                                       
///////////////////////////////////////////////////////////// Force Auxiliary  /////////////////////////////////////////////////
'{"I": 37604,  "N": "Apostle",                                      "G": "Force Auxiliary",            "O": 450 },',
'{"I": 37606,  "N": "Lif",                                          "G": "Force Auxiliary",            "O": 451 },',
'{"I": 37605,  "N": "Minokawa",                                     "G": "Force Auxiliary",            "O": 452 },',
'{"I": 37607,  "N": "Ninazu",                                       "G": "Force Auxiliary",            "O": 453 },',                                                                                                      

///////////////////////////////////////////////////////////// carriers  /////////////////////////////////////////////////
'{"I": 23757,  "N": "Archon",                                       "G": "Carrier",                    "O": 501 },',
'{"I": 23911,  "N": "Thanatos",                                     "G": "Carrier",                    "O": 503 },',
'{"I": 23915,  "N": "Chimera",                                      "G": "Carrier",                    "O": 502 },',
'{"I": 24483,  "N": "Nidhoggur",                                    "G": "Carrier",                    "O": 504 },',
                                                                                                       
///////////////////////////////////////////////////////////// jump freighters  /////////////////////////////////////////////////
'{"I": 28850,  "N": "Ark",                                          "G": "Jump Freighter",             "O": 601 },',
'{"I": 28848,  "N": "Anshar",                                       "G": "Jump Freighter",             "O": 602 },',
'{"I": 28844,  "N": "Rhea",                                         "G": "Jump Freighter",             "O": 603 },',
'{"I": 28846,  "N": "Nomad",                                        "G": "Jump Freighter",             "O": 604 },',
                                                                                                       
///////////////////////////////////////////////////////////// freighters  /////////////////////////////////////////////////
'{"I": 20183,  "N": "Providence",                                   "G": "Freighter",                  "O": 701 },',
'{"I": 20185,  "N": "Charon",                                       "G": "Freighter",                  "O": 702 },',
'{"I": 20187,  "N": "Obelisk",                                      "G": "Freighter",                  "O": 703 },',
'{"I": 20189,  "N": "Fenrir",                                       "G": "Freighter",                  "O": 704 },',
'{"I": 34328,  "N": "Bowhead",                                      "G": "Freighter",                  "O": 705 },',
                                                                                                       
///////////////////////////////////////////////////////////// orca  /////////////////////////////////////////////////
'{"I": 28606,  "N": "Orca",                                         "G": "Industrial Command Ship",    "O": 800 },',
                                                                                                       
///////////////////////////////////////////////////////////// marauders  /////////////////////////////////////////////////
'{"I": 28659,  "N": "Paladin",                                      "G": "Marauder",                   "O": 1001 },',
'{"I": 28710,  "N": "Golem",                                        "G": "Marauder",                   "O": 1002 },',
'{"I": 28661,  "N": "Kronos",                                       "G": "Marauder",                   "O": 1003 },',
'{"I": 28665,  "N": "Vargur",                                       "G": "Marauder",                   "O": 1004 },',
                                                                                                       
///////////////////////////////////////////////////////////// black ops  /////////////////////////////////////////////////
'{"I": 22428,  "N": "Redeemer",                                     "G": "Black Ops",                  "O": 1101 },',
'{"I": 22436,  "N": "Widow",                                        "G": "Black Ops",                  "O": 1102 },',
'{"I": 22430,  "N": "Sin",                                          "G": "Black Ops",                  "O": 1103 },',
'{"I": 22440,  "N": "Panther",                                      "G": "Black Ops",                  "O": 1104 },',
                                                                                                       
///////////////////////////////////////////////////////////// battleships /////////////////////////////////////////////////
// tournament prize bs                                                                                 
'{"I": 11936,  "N": "Apocalypse Imperial Issue",                    "G": "Battleship",                 "O": 1201 },',
'{"I": 11938,  "N": "Armageddon Imperial Issue",                    "G": "Battleship",                 "O": 1202 },',
'{"I": 13202,  "N": "Megathron Federate Issue",                     "G": "Battleship",                 "O": 1203 },',
'{"I": 26840,  "N": "Raven State Issue",                            "G": "Battleship",                 "O": 1204 },',
'{"I": 26842,  "N": "Tempest Tribal Issue",                         "G": "Battleship",                 "O": 1205 },',
                                                                                                       
// faction bs   
'{"I": 33472,  "N": "Nestor",                                       "G": "Battleship",                 "O": 1209 },',                                                                                       
'{"I": 33820,  "N": "Barghest",                                     "G": "Battleship",                 "O": 1210 },',
'{"I": 17736,  "N": "Nightmare",                                    "G": "Battleship",                 "O": 1211 },',
'{"I": 17738,  "N": "Machariel",                                    "G": "Battleship",                 "O": 1212 },',
'{"I": 17740,  "N": "Vindicator",                                   "G": "Battleship",                 "O": 1213 },',
'{"I": 17918,  "N": "Rattlesnake",                                  "G": "Battleship",                 "O": 1214 },',
'{"I": 17920,  "N": "Bhaalgorn",                                    "G": "Battleship",                 "O": 1215 },',

                                                                                                       
// navy bs                                                                                             
'{"I": 32305,  "N": "Armageddon Navy Issue",                        "G": "Battleship",                 "O": 1221 },',
'{"I": 32307,  "N": "Dominix Navy Issue",                           "G": "Battleship",                 "O": 1222 },',
'{"I": 32309,  "N": "Scorpion Navy Issue",                          "G": "Battleship",                 "O": 1223 },',
'{"I": 32311,  "N": "Typhoon Fleet Issue",                          "G": "Battleship",                 "O": 1224 },',
'{"I": 17636,  "N": "Raven Navy Issue",                             "G": "Battleship",                 "O": 1225 },',
'{"I": 17726,  "N": "Apocalypse Navy Issue",                        "G": "Battleship",                 "O": 1226 },',
'{"I": 17728,  "N": "Megathron Navy Issue",                         "G": "Battleship",                 "O": 1227 },',
'{"I": 17732,  "N": "Tempest Fleet Issue",                          "G": "Battleship",                 "O": 1228 },',
                                                                                                       
// gm bs                                                                                               
'{"I": 647,    "N": "Eidolon",                                      "G": "Battleship",                 "O": 1230 },',
                                                                                                       
// npc bs                                                                                              
'{"I": 1912,   "N": "Concord Police Battleship",                    "G": "Battleship",                 "O": 1231 },',
'{"I": 1914,   "N": "Concord Special Ops Battleship",               "G": "Battleship",                 "O": 1232 },',
'{"I": 1916,   "N": "Concord SWAT Battleship",                      "G": "Battleship",                 "O": 1233 },',
'{"I": 1918,   "N": "Concord Army Battleship",                      "G": "Battleship",                 "O": 1234 },',
'{"I": 4005,   "N": "Scorpion Ishukone Watch",                      "G": "Battleship",                 "O": 1235 },',
                                                                                                       
// t1 bs                                                                                                         
'{"I": 24692,  "N": "Abaddon",                                      "G": "Battleship",                 "O": 1251 },',
'{"I": 642,    "N": "Apocalypse",                                   "G": "Battleship",                 "O": 1252 },',
'{"I": 643,    "N": "Armageddon",                                   "G": "Battleship",                 "O": 1253 },',
                                                                                                       
'{"I": 640,    "N": "Scorpion",                                     "G": "Battleship",                 "O": 1261 },',
'{"I": 638,    "N": "Raven",                                        "G": "Battleship",                 "O": 1262 },',
'{"I": 24688,  "N": "Rokh",                                         "G": "Battleship",                 "O": 1263 },',
                                                                                                       
'{"I": 645,    "N": "Dominix",                                      "G": "Battleship",                 "O": 1271 },',
'{"I": 24690,  "N": "Hyperion",                                     "G": "Battleship",                 "O": 1272 },',
'{"I": 641,    "N": "Megathron",                                    "G": "Battleship",                 "O": 1273 },',
                                                                                                       
'{"I": 24694,  "N": "Maelstrom",                                    "G": "Battleship",                 "O": 1281 },',
'{"I": 639,    "N": "Tempest",                                      "G": "Battleship",                 "O": 1282 },',
'{"I": 644,    "N": "Typhoon",                                      "G": "Battleship",                 "O": 1283 },',
                                                                                                       
///////////////////////////////////////////////////////////// command ships  /////////////////////////////////////////////////
'{"I": 22448,  "N": "Absolution",                                   "G": "Command Ship",               "O": 2021 },',
'{"I": 22474,  "N": "Damnation",                                    "G": "Command Ship",               "O": 2022 },',
'{"I": 22470,  "N": "Nighthawk",                                    "G": "Command Ship",               "O": 2031 },',
'{"I": 22446,  "N": "Vulture",                                      "G": "Command Ship",               "O": 2032 },',
'{"I": 22466,  "N": "Astarte",                                      "G": "Command Ship",               "O": 2041 },',
'{"I": 22442,  "N": "Eos",                                          "G": "Command Ship",               "O": 2042 },',
'{"I": 22468,  "N": "Claymore",                                     "G": "Command Ship",               "O": 2051 },',
'{"I": 22444,  "N": "Sleipnir",                                     "G": "Command Ship",               "O": 2052 },',
                                                                                                       
///////////////////////////////////////////////////////////// attack battlecruisers /////////////////////////////////////////////////
'{"I": 4302,   "N": "Oracle",                                       "G": "Attack Battlecruiser",       "O": 2101 },',
'{"I": 4306,   "N": "Naga",                                         "G": "Attack Battlecruiser",       "O": 2102 },',
'{"I": 4308,   "N": "Talos",                                        "G": "Attack Battlecruiser",       "O": 2103 },',
'{"I": 4310,   "N": "Tornado",                                      "G": "Attack Battlecruiser",       "O": 2104 },',
                                                                                                       
///////////////////////////////////////////////////////////// combat battlecruisers  /////////////////////////////////////////////////
// navy bc                                                                                             
'{"I": 33155,  "N": "Harbinger Navy Issue",                         "G": "Combat Battlecruiser",       "O": 2201 },',
'{"I": 33153,  "N": "Drake Navy Issue",                             "G": "Combat Battlecruiser",       "O": 2202 },',
'{"I": 33151,  "N": "Brutix Navy Issue",                            "G": "Combat Battlecruiser",       "O": 2203 },',
'{"I": 33157,  "N": "Hurricane Fleet Issue",                        "G": "Combat Battlecruiser",       "O": 2204 },',
                                                                                                       
// faction bc                                                                                          
'{"I": 3756,   "N": "Gnosis",                                       "G": "Combat Battlecruiser",       "O": 2205 },',
                                                                                                       
// t1 bc                                                                                               
'{"I": 24696,  "N": "Harbinger",                                    "G": "Combat Battlecruiser",       "O": 2221 },',
'{"I": 16233,  "N": "Prophecy",                                     "G": "Combat Battlecruiser",       "O": 2222 },',
'{"I": 24698,  "N": "Drake",                                        "G": "Combat Battlecruiser",       "O": 2231 },',
'{"I": 16227,  "N": "Ferox",                                        "G": "Combat Battlecruiser",       "O": 2232 },',
'{"I": 16229,  "N": "Brutix",                                       "G": "Combat Battlecruiser",       "O": 2241 },',
'{"I": 24700,  "N": "Myrmidon",                                     "G": "Combat Battlecruiser",       "O": 2242 },',
'{"I": 16231,  "N": "Cyclone",                                      "G": "Combat Battlecruiser",       "O": 2251 },',
'{"I": 24702,  "N": "Hurricane",                                    "G": "Combat Battlecruiser",       "O": 2252 },',
                                                                                                       
///////////////////////////////////////////////////////////// t3 cruisers  /////////////////////////////////////////////////
'{"I": 29986,  "N": "Legion",                                       "G": "Strategic Cruiser",          "O": 3001 },',
'{"I": 29984,  "N": "Tengu",                                        "G": "Strategic Cruiser",          "O": 3002 },',
'{"I": 29988,  "N": "Proteus",                                      "G": "Strategic Cruiser",          "O": 3003 },',
'{"I": 29990,  "N": "Loki",                                         "G": "Strategic Cruiser",          "O": 3004 },',
                                                                                                       
///////////////////////////////////////////////////////////// HICS  /////////////////////////////////////////////////
'{"I": 12017,  "N": "Devoter",                                      "G": "Heavy Interdiction Cruiser", "O": 3101 },',
'{"I": 11995,  "N": "Onyx",                                         "G": "Heavy Interdiction Cruiser", "O": 3102 },',
'{"I": 12021,  "N": "Phobos",                                       "G": "Heavy Interdiction Cruiser", "O": 3103 },',
'{"I": 12013,  "N": "Broadsword",                                   "G": "Heavy Interdiction Cruiser", "O": 3104 },',
                                                                                                       
///////////////////////////////////////////////////////////// heavy assault cruisers  /////////////////////////////////////////////////
// faction hacs                                                                                        
'{"I": 2836,   "N": "Adrestia",                                     "G": "Heavy Assault Cruiser",      "O": 3201 },',
'{"I": 32209,  "N": "Mimir",                                        "G": "Heavy Assault Cruiser",      "O": 3202 },',
'{"I": 3518,   "N": "Vangel",                                       "G": "Heavy Assault Cruiser",      "O": 3203 },',
                                                                                                       
'{"I": 12019,  "N": "Sacrilege",                                    "G": "Heavy Assault Cruiser",      "O": 3251 },',
'{"I": 12003,  "N": "Zealot",                                       "G": "Heavy Assault Cruiser",      "O": 3252 },',
                                                                                                       
'{"I": 11993,  "N": "Cerberus",                                     "G": "Heavy Assault Cruiser",      "O": 3261 },',
'{"I": 12011,  "N": "Eagle",                                        "G": "Heavy Assault Cruiser",      "O": 3262 },',
                                                                                                       
'{"I": 12023,  "N": "Deimos",                                       "G": "Heavy Assault Cruiser",      "O": 3271 },',
'{"I": 12005,  "N": "Ishtar",                                       "G": "Heavy Assault Cruiser",      "O": 3272 },',
                                                                                                       
'{"I": 12015,  "N": "Muninn",                                       "G": "Heavy Assault Cruiser",      "O": 3281 },',
'{"I": 11999,  "N": "Vagabond",                                     "G": "Heavy Assault Cruiser",      "O": 3282 },',
                                                                                                       
///////////////////////////////////////////////////////////// combat recons  /////////////////////////////////////////////////
'{"I": 20125,  "N": "Curse",                                        "G": "Combat Recon Ship",          "O": 3301 },',
'{"I": 11959,  "N": "Rook",                                         "G": "Combat Recon Ship",          "O": 3302 },',
'{"I": 11971,  "N": "Lachesis",                                     "G": "Combat Recon Ship",          "O": 3303 },',
'{"I": 11961,  "N": "Huginn",                                       "G": "Combat Recon Ship",          "O": 3304 },',
                                                                                                       
///////////////////////////////////////////////////////////// force recons  /////////////////////////////////////////////////
'{"I": 11965,  "N": "Pilgrim",                                      "G": "Force Recon Ship",           "O": 3401 },',
'{"I": 11957,  "N": "Falcon",                                       "G": "Force Recon Ship",           "O": 3402 },',
'{"I": 11969,  "N": "Arazu",                                        "G": "Force Recon Ship",           "O": 3403 },',
'{"I": 11963,  "N": "Rapier",                                       "G": "Force Recon Ship",           "O": 3404 },',
                                                                                                       
///////////////////////////////////////////////////////////// logistics  /////////////////////////////////////////////////
'{"I": 32790,  "N": "Etana",                                        "G": "Logistics",                  "O": 3500 },',
'{"I": 11987,  "N": "Guardian",                                     "G": "Logistics",                  "O": 3501 },',
'{"I": 11985,  "N": "Basilisk",                                     "G": "Logistics",                  "O": 3502 },',
'{"I": 11989,  "N": "Oneiros",                                      "G": "Logistics",                  "O": 3503 },',
'{"I": 11978,  "N": "Scimitar",                                     "G": "Logistics",                  "O": 3504 },',
                                                                                                       
///////////////////////////////////////////////////////////// cruisers /////////////////////////////////////////////////
// misc cruiser
'{"I": 34590,  "N": "Victorieux Luxury Yacht",                      "G": "Cruiser",                    "O": 3598 },',                                                                                   

// faction cruisers 
'{"I": 33470,  "N": "Stratios",                                     "G": "Cruiser",                    "O": 3599 },',                                                                                   
'{"I": 33818,  "N": "Orthrus",                                      "G": "Cruiser",                    "O": 3600 },',
'{"I": 17922,  "N": "Ashimmu",                                      "G": "Cruiser",                    "O": 3601 },',
'{"I": 17720,  "N": "Cynabal",                                      "G": "Cruiser",                    "O": 3602 },',
'{"I": 17715,  "N": "Gila",                                         "G": "Cruiser",                    "O": 3603 },',
'{"I": 17718,  "N": "Phantasm",                                     "G": "Cruiser",                    "O": 3604 },',
'{"I": 17722,  "N": "Vigilant",                                     "G": "Cruiser",                    "O": 3605 },',

                                                                                                       
// navy cruisers                                                                                       
'{"I": 29337,  "N": "Augoror Navy Issue",                           "G": "Cruiser",                    "O": 3611 },',
'{"I": 17709,  "N": "Omen Navy Issue",                              "G": "Cruiser",                    "O": 3612 },',
'{"I": 17634,  "N": "Caracal Navy Issue",                           "G": "Cruiser",                    "O": 3613 },',
'{"I": 29340,  "N": "Osprey Navy Issue",                            "G": "Cruiser",                    "O": 3614 },',
'{"I": 29344,  "N": "Exequror Navy Issue",                          "G": "Cruiser",                    "O": 3615 },',
'{"I": 17843,  "N": "Vexor Navy Issue",                             "G": "Cruiser",                    "O": 3616 },',
'{"I": 29336,  "N": "Scythe Fleet Issue",                           "G": "Cruiser",                    "O": 3617 },',
'{"I": 17713,  "N": "Stabber Fleet Issue",                          "G": "Cruiser",                    "O": 3618 },',
                                                                                                       
// tournament prize cruisers                                                                             
'{"I": 11011,  "N": "Guardian-Vexor",                               "G": "Cruiser",                    "O": 3621 },',
'{"I": 635,    "N": "Opux Luxury Yacht",                            "G": "Cruiser",                    "O": 3622 },',
'{"I": 25560,  "N": "Opux Dragoon Yacht",                           "G": "Cruiser",                    "O": 3623 },',
'{"I": 3878,   "N": "Phantom",                                      "G": "Cruiser",                    "O": 3624 },',
                                                                                                       
// npc ships                                                                                             
'{"I": 1904,   "N": "Concord Police Cruiser",                       "G": "Cruiser",                    "O": 3630 },',
                                                                                                       
// t1 cruisers                                                                                           
'{"I": 628,    "N": "Arbitrator",                                   "G": "Cruiser",                    "O": 3651 },',
'{"I": 625,    "N": "Augoror",                                      "G": "Cruiser",                    "O": 3652 },',
'{"I": 624,    "N": "Maller",                                       "G": "Cruiser",                    "O": 3653 },',
'{"I": 2006,   "N": "Omen",                                         "G": "Cruiser",                    "O": 3654 },',
                                                                                                       
'{"I": 632,    "N": "Blackbird",                                    "G": "Cruiser",                    "O": 3661 },',
'{"I": 621,    "N": "Caracal",                                      "G": "Cruiser",                    "O": 3662 },',
'{"I": 623,    "N": "Moa",                                          "G": "Cruiser",                    "O": 3663 },',
'{"I": 620,    "N": "Osprey",                                       "G": "Cruiser",                    "O": 3664 },',
                                                                                                       
'{"I": 633,    "N": "Celestis",                                     "G": "Cruiser",                    "O": 3671 },',
'{"I": 634,    "N": "Exequror",                                     "G": "Cruiser",                    "O": 3672 },',
'{"I": 627,    "N": "Thorax",                                       "G": "Cruiser",                    "O": 3673 },',
'{"I": 626,    "N": "Vexor",                                        "G": "Cruiser",                    "O": 3674 },',
                                                                                                       
'{"I": 630,    "N": "Bellicose",                                    "G": "Cruiser",                    "O": 3681 },',
'{"I": 629,    "N": "Rupture",                                      "G": "Cruiser",                    "O": 3682 },',
'{"I": 631,    "N": "Scythe",                                       "G": "Cruiser",                    "O": 3683 },',
'{"I": 622,    "N": "Stabber",                                      "G": "Cruiser",                    "O": 3684 },',
'{"I": 33651,    "N": "Thorax Aliastra Edition",                    "G": "Cruiser",                    "O": 3685 },',

///////////////////////////////////////////////////////////// Command destroyers  /////////////////////////////////////////////////
'{"I": 37481,  "N": "Pontifex",                                     "G": "Command Destroyer",          "O": 3701 },',
'{"I": 37482,  "N": "Stork",                                        "G": "Command Destroyer",          "O": 3702 },',
'{"I": 37483,  "N": "Magus",                                        "G": "Command Destroyer",          "O": 3703 },',
'{"I": 37480,  "N": "Bifrost",                                      "G": "Command Destroyer",          "O": 3704 },',

///////////////////////////////////////////////////////////// tactical destroyers  /////////////////////////////////////////////////
'{"I": 34317,  "N": "Confessor",                                    "G": "Tactical Destroyer",         "O": 3801 },',
'{"I": 34828,  "N": "Jackdaw",                                      "G": "Tactical Destroyer",         "O": 3802 },',
'{"I": 35683,  "N": "Hecate",                                       "G": "Tactical Destroyer",         "O": 3803 },',
'{"I": 34562,  "N": "Svipul",                                       "G": "Tactical Destroyer",         "O": 3804 },',
                                                                                                       
///////////////////////////////////////////////////////////// dictors  /////////////////////////////////////////////////
'{"I": 22452,  "N": "Heretic",                                      "G": "Interdictor",                "O": 4001 },',
'{"I": 22464,  "N": "Flycatcher",                                   "G": "Interdictor",                "O": 4002 },',
'{"I": 22460,  "N": "Eris",                                         "G": "Interdictor",                "O": 4003 },',
'{"I": 22456,  "N": "Sabre",                                        "G": "Interdictor",                "O": 4004 },',
                                                                                                       
///////////////////////////////////////////////////////////// destroyers  /////////////////////////////////////////////////
'{"I": 32848,  "N": "Aliastra Catalyst",                            "G": "Destroyer",                  "O": 4101 },',
'{"I": 32840,  "N": "InterBus Catalyst",                            "G": "Destroyer",                  "O": 4102 },',
'{"I": 32842,  "N": "Intaki Syndicate Catalyst",                    "G": "Destroyer",                  "O": 4103 },',
'{"I": 32844,  "N": "Inner Zone Shipping Catalyst",                 "G": "Destroyer",                  "O": 4104 },',
'{"I": 33099,  "N": "Nefantar Thrasher",                            "G": "Destroyer",                  "O": 4105 },',
'{"I": 32846,  "N": "Quafe Catalyst",                               "G": "Destroyer",                  "O": 4106 },',
'{"I": 33881,  "N": "Cormorant Guristas Edition",                   "G": "Destroyer",                  "O": 4107 },',
                                                                                                       
'{"I": 16236,  "N": "Coercer",                                      "G": "Destroyer",                  "O": 4121 },',
'{"I": 32874,  "N": "Dragoon",                                      "G": "Destroyer",                  "O": 4122 },',
'{"I": 32876,  "N": "Corax",                                        "G": "Destroyer",                  "O": 4131 },',
'{"I": 16238,  "N": "Cormorant",                                    "G": "Destroyer",                  "O": 4132 },',
'{"I": 32872,  "N": "Algos",                                        "G": "Destroyer",                  "O": 4141 },',
'{"I": 16240,  "N": "Catalyst",                                     "G": "Destroyer",                  "O": 4142 },',
'{"I": 32878,  "N": "Talwar",                                       "G": "Destroyer",                  "O": 4151 },',
'{"I": 16242,  "N": "Thrasher",                                     "G": "Destroyer",                  "O": 4152 },',

                                                                                                       
///////////////////////////////////////////////////////////// assault frigates  /////////////////////////////////////////////////
// gm/prize assault frigs                                                                              
'{"I": 11373,  "N": "Blade",                                        "G": "Assault Frigate",            "O": 5001 },',
'{"I": 32788,  "N": "Cambion",                                      "G": "Assault Frigate",            "O": 5002 },',
'{"I": 12036,  "N": "Dagger",                                       "G": "Assault Frigate",            "O": 5003 },',
'{"I": 11375,  "N": "Erinye",                                       "G": "Assault Frigate",            "O": 5004 },',
'{"I": 32207,  "N": "Freki",                                        "G": "Assault Frigate",            "O": 5005 },',
'{"I": 11383,  "N": "Gatherer",                                     "G": "Assault Frigate",            "O": 5006 },',
'{"I": 11389,  "N": "Kishar",                                       "G": "Assault Frigate",            "O": 5007 },',                                                         
'{"I": 3516,   "N": "Malice",                                       "G": "Assault Frigate",            "O": 5008 },',
'{"I": 2834,   "N": "Utu",                                          "G": "Assault Frigate",            "O": 5009 },',
                                                                                                       
//t2 assault frigs                                                                                     
'{"I": 11393,  "N": "Retribution",                                  "G": "Assault Frigate",            "O": 5051 },',
'{"I": 11365,  "N": "Vengeance",                                    "G": "Assault Frigate",            "O": 5052 },',
'{"I": 11381,  "N": "Harpy",                                        "G": "Assault Frigate",            "O": 5061 },',
'{"I": 11379,  "N": "Hawk",                                         "G": "Assault Frigate",            "O": 5062 },',
'{"I": 12044,  "N": "Enyo",                                         "G": "Assault Frigate",            "O": 5071 },',
'{"I": 12042,  "N": "Ishkur",                                       "G": "Assault Frigate",            "O": 5072 },',
'{"I": 11400,  "N": "Jaguar",                                       "G": "Assault Frigate",            "O": 5081 },',
'{"I": 11371,  "N": "Wolf",                                         "G": "Assault Frigate",            "O": 5082 },',
                                                                                                       
///////////////////////////////////////////////////////////// bombers  /////////////////////////////////////////////////
'{"I": 12038,  "N": "Purifier",                                     "G": "Stealth Bomber",             "O": 5101 },',
'{"I": 12032,  "N": "Manticore",                                    "G": "Stealth Bomber",             "O": 5102 },',
'{"I": 11377,  "N": "Nemesis",                                      "G": "Stealth Bomber",             "O": 5103 },',
'{"I": 12034,  "N": "Hound",                                        "G": "Stealth Bomber",             "O": 5104 },',
                                                                                                       
///////////////////////////////////////////////////////////// ewar frigates  /////////////////////////////////////////////////
'{"I": 11190,  "N": "Sentinel",                                     "G": "Electronic Attack Ship",     "O": 5201 },',
'{"I": 11194,  "N": "Kitsune",                                      "G": "Electronic Attack Ship",     "O": 5202 },',
'{"I": 11174,  "N": "Keres",                                        "G": "Electronic Attack Ship",     "O": 5203 },',
'{"I": 11387,  "N": "Hyena",                                        "G": "Electronic Attack Ship",     "O": 5204 },',
                                                                                                       
///////////////////////////////////////////////////////////// cov ops  /////////////////////////////////////////////////
'{"I": 11188,  "N": "Anathema",                                     "G": "Covert Ops",                 "O": 5301 },',
'{"I": 11192,  "N": "Buzzard",                                      "G": "Covert Ops",                 "O": 5302 },',
'{"I": 11172,  "N": "Helios",                                       "G": "Covert Ops",                 "O": 5303 },',
'{"I": 11182,  "N": "Cheetah",                                      "G": "Covert Ops",                 "O": 5304 },',
                                                                                                       
///////////////////////////////////////////////////////////// interceptors  /////////////////////////////////////////////////
'{"I": 11184,  "N": "Crusader",                                     "G": "Interceptor",                "O": 5421 },',
'{"I": 11186,  "N": "Malediction",                                  "G": "Interceptor",                "O": 5422 },',
'{"I": 11176,  "N": "Crow",                                         "G": "Interceptor",                "O": 5431 },',
'{"I": 11178,  "N": "Raptor",                                       "G": "Interceptor",                "O": 5432 },',
'{"I": 11202,  "N": "Ares",                                         "G": "Interceptor",                "O": 5441 },',
'{"I": 11200,  "N": "Taranis",                                      "G": "Interceptor",                "O": 5442 },',
'{"I": 11196,  "N": "Claw",                                         "G": "Interceptor",                "O": 5451 },',
'{"I": 11198,  "N": "Stiletto",                                     "G": "Interceptor",                "O": 5452 },',
                                                                                                       
///////////////////////////////////////////////////////////// frigates /////////////////////////////////////////////////
// logistics frigates
'{"I": 37457,  "N": "Deacon",                                       "G": "Frigate",                    "O": 5495 },',                                                                                   
'{"I": 37458,  "N": "Kirin",                                        "G": "Frigate",                    "O": 5496 },',                                                                                   
'{"I": 37460,  "N": "Scalpel",                                      "G": "Frigate",                    "O": 5497 },',    
'{"I": 37459,  "N": "Thalia",                                       "G": "Frigate",                    "O": 5498 },',    
//                                                                               
'{"I": 33697,  "N": "Prospect",                                     "G": "Frigate",                    "O": 5499 },',                                                                                   
// faction frigates 
'{"I": 33468,  "N": "Astero",                                       "G": "Frigate",                    "O": 5500 },',                                                                                   
'{"I": 33816,  "N": "Garmur",                                       "G": "Frigate",                    "O": 5500 },',
'{"I": 17926,  "N": "Cruor",                                        "G": "Frigate",                    "O": 5501 },',
'{"I": 17928,  "N": "Daredevil",                                    "G": "Frigate",                    "O": 5502 },',
'{"I": 17932,  "N": "Dramiel",                                      "G": "Frigate",                    "O": 5503 },',
'{"I": 17924,  "N": "Succubus",                                     "G": "Frigate",                    "O": 5504 },',
'{"I": 17930,  "N": "Worm",                                         "G": "Frigate",                    "O": 5505 },',
'{"I": 32880,  "N": "Venture",                                      "G": "Frigate",                    "O": 5506 },',
                                                                                                       
// navy frigates                                                                                       
'{"I": 17703,  "N": "Imperial Navy Slicer",                         "G": "Frigate",                    "O": 5511 },',
'{"I": 17619,  "N": "Caldari Navy Hookbill",                        "G": "Frigate",                    "O": 5512 },',
'{"I": 17841,  "N": "Federation Navy Comet",                        "G": "Frigate",                    "O": 5513 },',
'{"I": 17812,  "N": "Republic Fleet Firetail",                      "G": "Frigate",                    "O": 5514 },',
                                                                                                       
// npc frigates                                                                                        
'{"I": 3768,   "N": "Amarr Police Frigate",                         "G": "Frigate",                    "O": 5521 },',
'{"I": 1900,   "N": "Concord Army Frigate",                         "G": "Frigate",                    "O": 5522 },',
'{"I": 1896,   "N": "Concord Police Frigate",                       "G": "Frigate",                    "O": 5523 },',
'{"I": 1902,   "N": "Concord Special Ops Frigate",                  "G": "Frigate",                    "O": 5524 },',
'{"I": 1898,   "N": "Concord SWAT Frigate",                         "G": "Frigate",                    "O": 5525 },',
'{"I": 595,    "N": "Gallente Police Ship",                         "G": "Frigate",                    "O": 5526 },',
'{"I": 17705,  "N": "Khanid Navy Frigate",                          "G": "Frigate",                    "O": 5527 },',
'{"I": 600,    "N": "Minmatar Peacekeeper Ship",                    "G": "Frigate",                    "O": 5528 },',
'{"I": 17707,  "N": "Mordus Frigate",                               "G": "Frigate",                    "O": 5529 },',
'{"I": 3751,   "N": "SOCT 1",                                       "G": "Frigate",                    "O": 5530 },',
'{"I": 3753,   "N": "SOCT 2",                                       "G": "Frigate",                    "O": 5531 },',
                                                                                                       
// GM ships                                                                                              
'{"I": 11019,  "N": "Cockroach",                                    "G": "Frigate",                    "O": 5532 },',
'{"I": 613,    "N": "Devourer",                                     "G": "Frigate",                    "O": 5533 },',
'{"I": 3532,   "N": "Echelon",                                      "G": "Frigate",                    "O": 5534 },',
'{"I": 614,    "N": "Fury",                                         "G": "Frigate",                    "O": 5535 },',
'{"I": 17360,  "N": "Immovable Enigma",                             "G": "Frigate",                    "O": 5536 },',
'{"I": 618,    "N": "Lynx",                                         "G": "Frigate",                    "O": 5537 },',
'{"I": 616,    "N": "Medusa",                                       "G": "Frigate",                    "O": 5538 },',
'{"I": 611,    "N": "Specter",                                      "G": "Frigate",                    "O": 5539 },',
'{"I": 619,    "N": "Swordspine",                                   "G": "Frigate",                    "O": 5540 },',
'{"I": 610,    "N": "Wraith",                                       "G": "Frigate",                    "O": 5541 },',
                                                                                                       
// tournament prize frigates                                                                                   
'{"I": 11940,  "N": "Gold Magnate",                                 "G": "Frigate",                    "O": 5542 },',
'{"I": 11942,  "N": "Silver Magnate",                               "G": "Frigate",                    "O": 5543 },',
                                                                                                       
// gift frigates                                                                                         
'{"I": 32985,  "N": "Inner Zone Shipping Imicus",                   "G": "Frigate",                    "O": 5544 },',
'{"I": 32987,  "N": "Sarum Magnate",                                "G": "Frigate",                    "O": 5545 },',
'{"I": 32983,  "N": "Sukuuvestaa Heron",                            "G": "Frigate",                    "O": 5546 },',
'{"I": 33190,  "N": "Tash-Murkon Magnate",                          "G": "Frigate",                    "O": 5547 },',
'{"I": 32989,  "N": "Vherokior Probe",                              "G": "Frigate",                    "O": 5548 },',
                                                                                                       
// standard frigates                                                                                   
'{"I": 2161,   "N": "Crucifier",                                    "G": "Frigate",                    "O": 5551 },',
'{"I": 589,    "N": "Executioner",                                  "G": "Frigate",                    "O": 5552 },',
'{"I": 590,    "N": "Inquisitor",                                   "G": "Frigate",                    "O": 5553 },',
'{"I": 29248,  "N": "Magnate",                                      "G": "Frigate",                    "O": 5554 },',
'{"I": 591,    "N": "Tormentor",                                    "G": "Frigate",                    "O": 5555 },',
'{"I": 597,    "N": "Punisher",                                     "G": "Frigate",                    "O": 5556 },',
                                                                                                       
'{"I": 582,    "N": "Bantam",                                       "G": "Frigate",                    "O": 5561 },',
'{"I": 583,    "N": "Condor",                                       "G": "Frigate",                    "O": 5562 },',
'{"I": 584,    "N": "Griffin",                                      "G": "Frigate",                    "O": 5563 },',
'{"I": 605,    "N": "Heron",                                        "G": "Frigate",                    "O": 5564 },',
'{"I": 602,    "N": "Kestrel",                                      "G": "Frigate",                    "O": 5565 },',
'{"I": 603,    "N": "Merlin",                                       "G": "Frigate",                    "O": 5566 },',
                                                                                                       
'{"I": 608,    "N": "Atron",                                        "G": "Frigate",                    "O": 5571 },',
'{"I": 607,    "N": "Imicus",                                       "G": "Frigate",                    "O": 5572 },',
'{"I": 594,    "N": "Incursus",                                     "G": "Frigate",                    "O": 5573 },',
'{"I": 609,    "N": "Maulus",                                       "G": "Frigate",                    "O": 5574 },',
'{"I": 593,    "N": "Tristan",                                      "G": "Frigate",                    "O": 5575 },',
'{"I": 592,    "N": "Navitas",                                      "G": "Frigate",                    "O": 5576 },',
                                                                                                       
'{"I": 598,    "N": "Breacher",                                     "G": "Frigate",                    "O": 5581 },',
'{"I": 599,    "N": "Burst",                                        "G": "Frigate",                    "O": 5582 },',
'{"I": 586,    "N": "Probe",                                        "G": "Frigate",                    "O": 5583 },',
'{"I": 587,    "N": "Rifter",                                       "G": "Frigate",                    "O": 5584 },',
'{"I": 585,    "N": "Slasher",                                      "G": "Frigate",                    "O": 5585 },',
'{"I": 3766,   "N": "Vigil",                                        "G": "Frigate",                    "O": 5586 },',
'{"I": 33659,  "N": "Merlin Nugoeihuvi Edition",                    "G": "Frigate",                    "O": 5587 },',

                                                                                                       
///////////////////////////////////////////////////////////// exhumers  /////////////////////////////////////////////////
'{"I": 22544,  "N": "Hulk",                                         "G": "Exhumer",                    "O": 6001 },',
'{"I": 22546,  "N": "Skiff",                                        "G": "Exhumer",                    "O": 6002 },',
'{"I": 22548,  "N": "Mackinaw",                                     "G": "Exhumer",                    "O": 6003 },',
                                                                                                       
///////////////////////////////////////////////////////////// barges  /////////////////////////////////////////////////
'{"I": 17476,  "N": "Covetor",                                      "G": "Mining Barge",               "O": 6101 },',
'{"I": 17478,  "N": "Retriever",                                    "G": "Mining Barge",               "O": 6102 },',
'{"I": 17480,  "N": "Procurer",                                     "G": "Mining Barge",               "O": 6103 },',
                                                                                                       
///////////////////////////////////////////////////////////// deep space transports /////////////////////////////////////////////////
'{"I": 12753,  "N": "Impel",                                        "G": "Deep Space Transport",       "O": 7001 },',
'{"I": 12731,  "N": "Bustard",                                      "G": "Deep Space Transport",       "O": 7002 },',
'{"I": 12745,  "N": "Occator",                                      "G": "Deep Space Transport",       "O": 7003 },',
'{"I": 12747,  "N": "Mastodon",                                     "G": "Deep Space Transport",       "O": 7004 },',
                                                                                                       
///////////////////////////////////////////////////////////// blockade runners  /////////////////////////////////////////////////
'{"I": 12733,  "N": "Prorator",                                     "G": "Blockade Runner",            "O": 7101 },',
'{"I": 12729,  "N": "Crane",                                        "G": "Blockade Runner",            "O": 7102 },',
'{"I": 12743,  "N": "Viator",                                       "G": "Blockade Runner",            "O": 7103 },',
'{"I": 12735,  "N": "Prowler",                                      "G": "Blockade Runner",            "O": 7104 },',
                                                                                                       
///////////////////////////////////////////////////////////// industrials /////////////////////////////////////////////////
// tournament prizes                                                                                   
'{"I": 32811,  "N": "Iteron Mark IV Amastris Edition",              "G": "Industrial",                 "O": 7201 },',
'{"I": 4363,   "N": "Iteron Mark IV Quafe Ultra Edition",           "G": "Industrial",                 "O": 7202 },',
'{"I": 4388,   "N": "Iteron Mark IV Quafe Ultramarine Edition",     "G": "Industrial",                 "O": 7203 },',
                                                                                                       
// npc                                                                                                 
'{"I": 658,    "N": "Visitant",                                     "G": "Industrial",                 "O": 7210 },',
                                                                                                       
// ore                                                                                                 
'{"I": 2998,   "N": "Noctis",                                       "G": "Industrial",                 "O": 7221 },',
'{"I": 2863,   "N": "Primae",                                       "G": "Industrial",                 "O": 7222 },',
                                                                                                       
// t1 industrial                                                                                       
'{"I": 1944,   "N": "Bestower",                                     "G": "Industrial",                 "O": 7251 },',
'{"I": 19744,  "N": "Sigil",                                        "G": "Industrial",                 "O": 7252 },',
                                                                                                       
'{"I": 648,    "N": "Badger",                                       "G": "Industrial",                 "O": 7261 },',
'{"I": 649,    "N": "Tayra",                                        "G": "Industrial",                 "O": 7262 },',
                                                                                                       
'{"I": 655,    "N": "Epithal",                                      "G": "Industrial",                 "O": 7271 },',
'{"I": 657,    "N": "Iteron Mark V",                                "G": "Industrial",                 "O": 7272 },',
'{"I": 654,    "N": "Kryos",                                        "G": "Industrial",                 "O": 7273 },',
'{"I": 656,    "N": "Miasmos",                                      "G": "Industrial",                 "O": 7274 },',
'{"I": 650,    "N": "Nereus",                                       "G": "Industrial",                 "O": 7275 },',
                                                                                                       
'{"I": 651,    "N": "Hoarder",                                      "G": "Industrial",                 "O": 7281 },',
'{"I": 652,    "N": "Mammoth",                                      "G": "Industrial",                 "O": 7282 },',
'{"I": 653,    "N": "Wreathe",                                      "G": "Industrial",                 "O": 7283 },',
                                                                                                       
///////////////////////////////////////////////////////////// rookie ships /////////////////////////////////////////////////
// npc/gm                                                                                              
'{"I": 617,    "N": "Echo",                                         "G": "Rookie ship",                "O": 7301 },',
'{"I": 33079,  "N": "Hematos",                                      "G": "Rookie ship",                "O": 7302 },',
'{"I": 615,    "N": "Immolator",                                    "G": "Rookie ship",                "O": 7303 },',
'{"I": 9862,   "N": "Polaris Centurion Frigate",                    "G": "Rookie ship",                "O": 7304 },',
'{"I": 9858,   "N": "Polaris Centurion TEST",                       "G": "Rookie ship",                "O": 7305 },',
'{"I": 1233,   "N": "Polaris Enigma Frigate",                       "G": "Rookie ship",                "O": 7306 },',
'{"I": 9854,   "N": "Polaris Inspector Frigate",                    "G": "Rookie ship",                "O": 7307 },',
'{"I": 9860,   "N": "Polaris Legatus Frigate",                      "G": "Rookie ship",                "O": 7308 },',
'{"I": 33081,  "N": "Taipan",                                       "G": "Rookie ship",                "O": 7309 },',
'{"I": 33083,  "N": "Violator",                                     "G": "Rookie ship",                "O": 7310 },',
                                                                                                       
// t1 rookie ships                                                                                     
'{"I": 596,    "N": "Impairor",                                     "G": "Rookie ship",                "O": 7351 },',
'{"I": 601,    "N": "Ibis",                                         "G": "Rookie ship",                "O": 7361 },',
'{"I": 606,    "N": "Velator",                                      "G": "Rookie ship",                "O": 7371 },',
'{"I": 588,    "N": "Reaper",                                       "G": "Rookie ship",                "O": 7381 },',
                                                                                                       
///////////////////////////////////////////////////////////// exploration ship  /////////////////////////////////////////////////
'{"I": 2078,   "N": "Zephyr",                                       "G": "Prototype Exploration Ship", "O": 7400 },',
                                                                                                       
////////////////////////////////////////////////////////////// shuttles /////////////////////////////////////////////////
// faction/prize shuttles                                                                              
'{"I": 29266,  "N": "Apotheosis",                                   "G": "Shuttle",                    "O": 7501 },',
'{"I": 30842,  "N": "Interbus Shuttle",                             "G": "Shuttle",                    "O": 7502 },',
                                                                                                       
// npc shuttles                                                                                        
'{"I": 29328,  "N": "Amarr Media Shuttle",                          "G": "Shuttle",                    "O": 7511 },',
'{"I": 29330,  "N": "Caldari Media Shuttle",                        "G": "Shuttle",                    "O": 7512 },',
'{"I": 27299,  "N": "Civilian Amarr Shuttle",                       "G": "Shuttle",                    "O": 7513 },',
'{"I": 27301,  "N": "Civilian Caldari Shuttle",                     "G": "Shuttle",                    "O": 7514 },',
'{"I": 27303,  "N": "Civilian Gallente Shuttle",                    "G": "Shuttle",                    "O": 7515 },',
'{"I": 27305,  "N": "Civilian Minmatar Shuttle",                    "G": "Shuttle",                    "O": 7516 },',
'{"I": 29332,  "N": "Gallente Media Shuttle",                       "G": "Shuttle",                    "O": 7517 },',
'{"I": 21097,  "N": "Goru\'s Shuttle",                              "G": "Shuttle",                    "O": 7518 },',
'{"I": 21628,  "N": "Guristas Shuttle",                             "G": "Shuttle",                    "O": 7519 },',
'{"I": 29334,  "N": "Minmatar Media Shuttle",                       "G": "Shuttle",                    "O": 7520 },',
                                                                                                       
// t1 shuttles                                                                                         
'{"I": 11134,  "N": "Amarr Shuttle",                                "G": "Shuttle",                    "O": 7551 },',
'{"I": 672,    "N": "Caldari Shuttle",                              "G": "Shuttle",                    "O": 7561 },',
'{"I": 11129,  "N": "Gallente Shuttle",                             "G": "Shuttle",                    "O": 7571 },',
'{"I": 11132,  "N": "Minmatar Shuttle",                             "G": "Shuttle",                    "O": 7581 },',
                                                                                                       
///////////////////////////////////////////////////////////// pods /////////////////////////////////////////////////
'{"I": 670,    "N": "Capsule",                                      "G": "Capsule",                    "O": 7602 },',
'{"I": 33328,  "N": "Capsule - Genolution \'Auroral\' 197-variant", "G": "Capsule",                    "O": 7601 },',

///////////////////////////////////////////////////////////// SOV structures /////////////////////////////////////

// Citadels
'{"I": 40340, "N": "Upwell Palatine Keepstar",                      "G": "Citadel",                    "O": 50 },',
'{"I": 35834, "N": "Keepstar",                                      "G": "Citadel",                    "O": 51 },',
'{"I": 35833, "N": "Fortizar",                                      "G": "Citadel",                    "O": 52 },',
'{"I": 35832, "N": "Astrahus",                                      "G": "Citadel",                    "O": 54 },',

// TCUs
'{"I": 32300, "N": "QA Territorial Claim Unit",                     "G": "SOV Structure",              "O": 10000 },',
'{"I": 32226, "N": "Territorial Claim Unit",                        "G": "SOV Structure",              "O": 10001 },',

// ihubs
'{"I": 32458, "N": "Infrastructure Hub",                            "G": "SOV Structure",              "O": 10100 },',
'{"I": 32313, "N": "QA Infrastructure Hub",                         "G": "SOV Structure",              "O": 10101 },',

// SBUs
'{"I": 32302, "N": "QA Sovereignty Blockade Unit",                  "G": "SOV Structure",              "O": 10201 },',
'{"I": 32250, "N": "Sovereignty Blockade Unit",                     "G": "SOV Structure",              "O": 10202 },',

///////////////////////////////////////////////////////////// Control Towers ///////////////////////////////////
'{"I": 16213, "N": "Caldari Control Tower",                         "G": "Control Tower",              "O": 10301 },',
'{"I": 27538, "N": "Shadow Control Tower",                          "G": "Control Tower",              "O": 10302 },',
'{"I": 12236, "N": "Gallente Control Tower",                        "G": "Control Tower",              "O": 10303 },',
'{"I": 27536, "N": "Serpentis Control Tower",                       "G": "Control Tower",              "O": 10304 },',
'{"I": 12235, "N": "Amarr Control Tower",                           "G": "Control Tower",              "O": 10305 },',
'{"I": 27535, "N": "Dread Guristas Control Tower",                  "G": "Control Tower",              "O": 10306 },',
'{"I": 27780, "N": "Sansha Control Tower",                          "G": "Control Tower",              "O": 10307 },',
'{"I": 4361,  "N": "QA Fuel Control Tower",                         "G": "Control Tower",              "O": 10308 },',
'{"I": 27533, "N": "Guristas Control Tower",                        "G": "Control Tower",              "O": 10309 },',
'{"I": 16286, "N": "QA Control Tower",                              "G": "Control Tower",              "O": 10310 },',
'{"I": 27540, "N": "Domination Control Tower",                      "G": "Control Tower",              "O": 10311 },',
'{"I": 27532, "N": "Dark Blood Control Tower",                      "G": "Control Tower",              "O": 10312 },',
'{"I": 16214, "N": "Minmatar Control Tower",                        "G": "Control Tower",              "O": 10313 },',
'{"I": 27539, "N": "Angel Control Tower",                           "G": "Control Tower",              "O": 10314 },',
'{"I": 27786, "N": "True Sansha Control Tower",                     "G": "Control Tower",              "O": 10315 },',
'{"I": 27530, "N": "Blood Control Tower",                           "G": "Control Tower",              "O": 10316 },',
'{"I": 27609, "N": "Domination Control Tower Medium",               "G": "Control Tower",              "O": 10317 },',
'{"I": 20061, "N": "Caldari Control Tower Medium",                  "G": "Control Tower",              "O": 10318 },',
'{"I": 27607, "N": "Angel Control Tower Medium",                    "G": "Control Tower",              "O": 10319 },',
'{"I": 27782, "N": "Sansha Control Tower Medium",                   "G": "Control Tower",              "O": 10320 },',
'{"I": 27591, "N": "Dark Blood Control Tower Medium",               "G": "Control Tower",              "O": 10321 },',
'{"I": 20065, "N": "Minmatar Control Tower Medium",                 "G": "Control Tower",              "O": 10322 },',
'{"I": 20059, "N": "Amarr Control Tower Medium",                    "G": "Control Tower",              "O": 10323 },',
'{"I": 27589, "N": "Blood Control Tower Medium",                    "G": "Control Tower",              "O": 10324 },',
'{"I": 27788, "N": "True Sansha Control Tower Medium",              "G": "Control Tower",              "O": 10325 },',
'{"I": 27597, "N": "Dread Guristas Control Tower Medium",           "G": "Control Tower",              "O": 10326 },',
'{"I": 20063, "N": "Gallente Control Tower Medium",                 "G": "Control Tower",              "O": 10327 },',
'{"I": 27595, "N": "Guristas Control Tower Medium",                 "G": "Control Tower",              "O": 10328 },',
'{"I": 27603, "N": "Shadow Control Tower Medium",                   "G": "Control Tower",              "O": 10329 },',
'{"I": 27601, "N": "Serpentis Control Tower Medium",                "G": "Control Tower",              "O": 10330 },',
'{"I": 27784, "N": "Sansha Control Tower Small",                    "G": "Control Tower",              "O": 10331 },',
'{"I": 27592, "N": "Blood Control Tower Small",                     "G": "Control Tower",              "O": 10332 },',
'{"I": 20066, "N": "Minmatar Control Tower Small",                  "G": "Control Tower",              "O": 10333 },',
'{"I": 27600, "N": "Dread Guristas Control Tower Small",            "G": "Control Tower",              "O": 10334 },',
'{"I": 20060, "N": "Amarr Control Tower Small",                     "G": "Control Tower",              "O": 10335 },',
'{"I": 27790, "N": "True Sansha Control Tower Small",               "G": "Control Tower",              "O": 10336 },',
'{"I": 27598, "N": "Guristas Control Tower Small",                  "G": "Control Tower",              "O": 10337 },',
'{"I": 27606, "N": "Shadow Control Tower Small",                    "G": "Control Tower",              "O": 10338 },',
'{"I": 20064, "N": "Gallente Control Tower Small",                  "G": "Control Tower",              "O": 10339 },',
'{"I": 27604, "N": "Serpentis Control Tower Small",                 "G": "Control Tower",              "O": 10340 },',
'{"I": 27612, "N": "Domination Control Tower Small",                "G": "Control Tower",              "O": 10341 },',
'{"I": 27610, "N": "Angel Control Tower Small",                     "G": "Control Tower",              "O": 10342 },',
'{"I": 20062, "N": "Caldari Control Tower Small",                   "G": "Control Tower",              "O": 10343 },',
'{"I": 27594, "N": "Dark Blood Control Tower Small",                "G": "Control Tower",              "O": 10344 },',

///////////////////////////////////////////////////////////// Orbital Infrastructure ///////////////////////////////////
'{"I": 2233, "N": "Customs Office",                                "G": "Orbital Infrastructure",     "O": 10401 },',

///////////////////////////////////////////////////////////// POS Mods - General /////////////////////////////////
// smas
'{"I": 24646, "N": "X-Large Ship Maintenance Array",                "G": "Ship Maintenance Array",     "O": 11101 },',
'{"I": 12237, "N": "Ship Maintenance Array",                        "G": "Ship Maintenance Array",     "O": 11102 },',

// chas
'{"I": 24652, "N": "Capital Shipyard",                              "G": "Corporate Hangar Array",     "O": 11201 },',
'{"I": 17621, "N": "Corporate Hangar Array",                        "G": "Corporate Hangar Array",     "O": 11202 },',

'{"I": 27675, "N": "System Scanning Array",                         "G": "Scanner Array",              "O": 11301 },',
'{"I": 17188, "N": "Force Field Array",                             "G": "Force Field Array",          "O": 11302 },',
'{"I": 27674, "N": "Cynosural System Jammer",                       "G": "Cynosural System Jammer",    "O": 11303 },',
'{"I": 27673, "N": "Cynosural Generator Array",                     "G": "Cynosural Generator Array",  "O": 11304 },',
'{"I": 27897, "N": "Jump Bridge",                                   "G": "Jump Portal Array",          "O": 11305 },',
'{"I": 4359,  "N": "QA Jump Bridge",                                "G": "Jump Portal Array",          "O": 11306 },',


///////////////////////////////////////////////////////////// POS Mods - Defense //////////////////////////////////////////
// energy neuts
'{"I": 27672, "N": "Energy Neutralizing Battery",                   "G": "Energy Neutralizing Battery","O": 15101 },',
'{"I": 27858, "N": "Dark Blood Energy Neutralizing Battery",        "G": "Energy Neutralizing Battery","O": 15102 },',
'{"I": 27857, "N": "Blood Energy Neutralizing Battery",             "G": "Energy Neutralizing Battery","O": 15103 },',
'{"I": 27856, "N": "True Sansha Energy Neutralizing Battery",       "G": "Energy Neutralizing Battery","O": 15104 },',
'{"I": 27855, "N": "Sansha Energy Neutralizing Battery",            "G": "Energy Neutralizing Battery","O": 15105 },',

// hardeners
'{"I": 17187, "N": "Photon Scattering Array",                       "G": "Shield Hardening Array",     "O": 15201 },',
'{"I": 17186, "N": "Heat Dissipation Array",                        "G": "Shield Hardening Array",     "O": 15202 },',
'{"I": 17185, "N": "Explosion Dampening Array",                     "G": "Shield Hardening Array",     "O": 15203 },',
'{"I": 17184, "N": "Ballistic Deflection Array",                    "G": "Shield Hardening Array",     "O": 15204 },',

// webs
'{"I": 27573, "N": "Domination Stasis Webification Battery",        "G": "Stasis Webification Battery","O": 15301 },',
'{"I": 27570, "N": "Angel Stasis Webification Battery",             "G": "Stasis Webification Battery","O": 15302 },',
'{"I": 17178, "N": "Stasis Webification Battery",                   "G": "Stasis Webification Battery","O": 15303 },',

// hybrid guns
'{"I": 27547, "N": "Shadow Large Railgun Battery",                  "G": "Mobile Hybrid Sentry",       "O": 15401 },',
'{"I": 27545, "N": "Serpentis Large Railgun Battery",               "G": "Mobile Hybrid Sentry",       "O": 15402 },',
'{"I": 16692, "N": "Large Railgun Battery",                         "G": "Mobile Hybrid Sentry",       "O": 15403 },',
'{"I": 17402, "N": "Large Blaster Battery",                         "G": "Mobile Hybrid Sentry",       "O": 15404 },',
'{"I": 27544, "N": "Shadow Large Blaster Battery",                  "G": "Mobile Hybrid Sentry",       "O": 15405 },',
'{"I": 27542, "N": "Serpentis Large Blaster Battery",               "G": "Mobile Hybrid Sentry",       "O": 15406 },',
'{"I": 27618, "N": "Shadow Medium Railgun Battery",                 "G": "Mobile Hybrid Sentry",       "O": 15407 },',
'{"I": 27616, "N": "Serpentis Medium Railgun Battery",              "G": "Mobile Hybrid Sentry",       "O": 15408 },',
'{"I": 16691, "N": "Medium Railgun Battery",                        "G": "Mobile Hybrid Sentry",       "O": 15409 },',
'{"I": 27613, "N": "Serpentis Medium Blaster Battery",              "G": "Mobile Hybrid Sentry",       "O": 15410 },',
'{"I": 17403, "N": "Medium Blaster Battery",                        "G": "Mobile Hybrid Sentry",       "O": 15411 },',
'{"I": 27615, "N": "Shadow Medium Blaster Battery",                 "G": "Mobile Hybrid Sentry",       "O": 15412 },',
'{"I": 16690, "N": "Small Railgun Battery",                         "G": "Mobile Hybrid Sentry",       "O": 15413 },',
'{"I": 27622, "N": "Serpentis Small Railgun Battery",               "G": "Mobile Hybrid Sentry",       "O": 15414 },',
'{"I": 27624, "N": "Shadow Small Railgun Battery",                  "G": "Mobile Hybrid Sentry",       "O": 15415 },',
'{"I": 17404, "N": "Small Blaster Battery",                         "G": "Mobile Hybrid Sentry",       "O": 15416 },',
'{"I": 27621, "N": "Shadow Small Blaster Battery",                  "G": "Mobile Hybrid Sentry",       "O": 15417 },',
'{"I": 27619, "N": "Serpentis Small Blaster Battery",               "G": "Mobile Hybrid Sentry",       "O": 15418 },',

// projectile guns
'{"I": 27559, "N": "Domination Large Artillery Battery",            "G": "Mobile Projectile Sentry",   "O": 15501 },',
'{"I": 27557, "N": "Angel Large Artillery Battery",                 "G": "Mobile Projectile Sentry",   "O": 15502 },',
'{"I": 16689, "N": "Large Artillery Battery",                       "G": "Mobile Projectile Sentry",   "O": 15503 },',
'{"I": 27554, "N": "Angel Large AutoCannon Battery",                "G": "Mobile Projectile Sentry",   "O": 15504 },',
'{"I": 17770, "N": "Large AutoCannon Battery",                      "G": "Mobile Projectile Sentry",   "O": 15505 },',
'{"I": 27556, "N": "Domination Large AutoCannon Battery",           "G": "Mobile Projectile Sentry",   "O": 15506 },',
'{"I": 27646, "N": "Domination Medium Artillery Battery",           "G": "Mobile Projectile Sentry",   "O": 15507 },',
'{"I": 27644, "N": "Angel Medium Artillery Battery",                "G": "Mobile Projectile Sentry",   "O": 15508 },',
'{"I": 16688, "N": "Medium Artillery Battery",                      "G": "Mobile Projectile Sentry",   "O": 15509 },',
'{"I": 17771, "N": "Medium AutoCannon Battery",                     "G": "Mobile Projectile Sentry",   "O": 15510 },',
'{"I": 27649, "N": "Domination Medium AutoCannon Battery",          "G": "Mobile Projectile Sentry",   "O": 15511 },',
'{"I": 27647, "N": "Angel Medium AutoCannon Battery",               "G": "Mobile Projectile Sentry",   "O": 15512 },',
'{"I": 16631, "N": "Small Artillery Battery",                       "G": "Mobile Projectile Sentry",   "O": 15513 },',
'{"I": 27652, "N": "Domination Small Artillery Battery",            "G": "Mobile Projectile Sentry",   "O": 15514 },',
'{"I": 27650, "N": "Angel Small Artillery Battery",                 "G": "Mobile Projectile Sentry",   "O": 15515 },',
'{"I": 27653, "N": "Angel Small AutoCannon Battery",                "G": "Mobile Projectile Sentry",   "O": 15516 },',
'{"I": 17772, "N": "Small AutoCannon Battery",                      "G": "Mobile Projectile Sentry",   "O": 15517 },',
'{"I": 27655, "N": "Domination Small AutoCannon Battery",           "G": "Mobile Projectile Sentry",   "O": 15518 },',

// lasers
'{"I": 27551, "N": "Blood Large Beam Laser Battery",                "G": "Mobile Laser Sentry",        "O": 15601 },',
'{"I": 27772, "N": "True Sansha Large Beam Laser Battery",          "G": "Mobile Laser Sentry",        "O": 15602 },',
'{"I": 27766, "N": "Sansha Large Beam Laser Battery",               "G": "Mobile Laser Sentry",        "O": 15603 },',
'{"I": 16694, "N": "Large Beam Laser Battery",                      "G": "Mobile Laser Sentry",        "O": 15604 },',
'{"I": 27553, "N": "Dark Blood Large Beam Laser Battery",           "G": "Mobile Laser Sentry",        "O": 15605 },',
'{"I": 17406, "N": "Large Pulse Laser Battery",                     "G": "Mobile Laser Sentry",        "O": 15606 },',
'{"I": 27767, "N": "Sansha Large Pulse Laser Battery",              "G": "Mobile Laser Sentry",        "O": 15607 },',
'{"I": 27550, "N": "Dark Blood Large Pulse Laser Battery",          "G": "Mobile Laser Sentry",        "O": 15608 },',
'{"I": 27548, "N": "Blood Large Pulse Laser Battery",               "G": "Mobile Laser Sentry",        "O": 15609 },',
'{"I": 27773, "N": "True Sansha Large Pulse Laser Battery",         "G": "Mobile Laser Sentry",        "O": 15610 },',
'{"I": 17168, "N": "Medium Beam Laser Battery",                     "G": "Mobile Laser Sentry",        "O": 15611 },',
'{"I": 27627, "N": "Dark Blood Medium Beam Laser Battery",          "G": "Mobile Laser Sentry",        "O": 15612 },',
'{"I": 27625, "N": "Blood Medium Beam Laser Battery",               "G": "Mobile Laser Sentry",        "O": 15613 },',
'{"I": 27774, "N": "True Sansha Medium Beam Laser Battery",         "G": "Mobile Laser Sentry",        "O": 15614 },',
'{"I": 27768, "N": "Sansha Medium Beam Laser Battery",              "G": "Mobile Laser Sentry",        "O": 15615 },',
'{"I": 27630, "N": "Dark Blood Medium Pulse Laser Battery",         "G": "Mobile Laser Sentry",        "O": 15616 },',
'{"I": 27628, "N": "Blood Medium Pulse Laser Battery",              "G": "Mobile Laser Sentry",        "O": 15617 },',
'{"I": 27775, "N": "True Sansha Medium Pulse Laser Battery",        "G": "Mobile Laser Sentry",        "O": 15618 },',
'{"I": 27769, "N": "Sansha Medium Pulse Laser Battery",             "G": "Mobile Laser Sentry",        "O": 15619 },',
'{"I": 17407, "N": "Medium Pulse Laser Battery",                    "G": "Mobile Laser Sentry",        "O": 15620 },',
'{"I": 27776, "N": "True Sansha Small Beam Laser Battery",          "G": "Mobile Laser Sentry",        "O": 15621 },',
'{"I": 17167, "N": "Small Beam Laser Battery",                      "G": "Mobile Laser Sentry",        "O": 15622 },',
'{"I": 27770, "N": "Sansha Small Beam Laser Battery",               "G": "Mobile Laser Sentry",        "O": 15623 },',
'{"I": 27633, "N": "Dark Blood Small Beam Laser Battery",           "G": "Mobile Laser Sentry",        "O": 15624 },',
'{"I": 27631, "N": "Blood Small Beam Laser Battery",                "G": "Mobile Laser Sentry",        "O": 15625 },',
'{"I": 27777, "N": "True Sansha Small Pulse Laser Battery",         "G": "Mobile Laser Sentry",        "O": 15626 },',
'{"I": 27771, "N": "Sansha Small Pulse Laser Battery",              "G": "Mobile Laser Sentry",        "O": 15627 },',
'{"I": 27636, "N": "Dark Blood Small Pulse Laser Battery",          "G": "Mobile Laser Sentry",        "O": 15628 },',
'{"I": 27634, "N": "Blood Small Pulse Laser Battery",               "G": "Mobile Laser Sentry",        "O": 15629 },',
'{"I": 17408, "N": "Small Pulse Laser Battery",                     "G": "Mobile Laser Sentry",        "O": 15630 },',
'{"I": 16867, "N": "Ultra Fast Mobile Laser Sentry",                "G": "Mobile Laser Sentry",        "O": 15631 },',

// missiles
'{"I": 27562, "N": "Dread Guristas Citadel Torpedo Battery",        "G": "Mobile Missile Sentry",      "O": 15701 },',
'{"I": 27560, "N": "Guristas Citadel Torpedo Battery",              "G": "Mobile Missile Sentry",      "O": 15702 },',
'{"I": 17773, "N": "Citadel Torpedo Battery",                       "G": "Mobile Missile Sentry",      "O": 15703 },',
'{"I": 27643, "N": "Dread Guristas Torpedo Battery",                "G": "Mobile Missile Sentry",      "O": 15704 },',
'{"I": 27641, "N": "Guristas Torpedo Battery",                      "G": "Mobile Missile Sentry",      "O": 15705 },',
'{"I": 16697, "N": "Torpedo Battery",                               "G": "Mobile Missile Sentry",      "O": 15706 },',
'{"I": 16696, "N": "Cruise Missile Battery",                        "G": "Mobile Missile Sentry",      "O": 15707 },',
'{"I": 27638, "N": "Guristas Cruise Missile Battery",               "G": "Mobile Missile Sentry",      "O": 15708 },',
'{"I": 27640, "N": "Dread Guristas Cruise Missile Battery",         "G": "Mobile Missile Sentry",      "O": 15709 },',
'{"I": 16695, "N": "Heavy Missile Battery",                         "G": "Mobile Missile Sentry",      "O": 15710 },',
'{"I": 16222, "N": "Light Missile Battery",                         "G": "Mobile Missile Sentry",      "O": 15711 },',

// scrams
'{"I": 17181, "N": "Warp Disruption Battery",                       "G": "Warp Scrambling Battery",    "O": 15801 },',
'{"I": 27565, "N": "Shadow Warp Disruption Battery",                "G": "Warp Scrambling Battery",    "O": 15802 },',
'{"I": 27563, "N": "Serpentis Warp Disruption Battery",             "G": "Warp Scrambling Battery",    "O": 15803 },',
'{"I": 27569, "N": "Shadow Warp Scrambling Battery",                "G": "Warp Scrambling Battery",    "O": 15804 },',
'{"I": 27567, "N": "Serpentis Warp Scrambling Battery",             "G": "Warp Scrambling Battery",    "O": 15805 },',
'{"I": 17182, "N": "Warp Scrambling Battery",                       "G": "Warp Scrambling Battery",    "O": 15806 },',

// ecm
'{"I": 17176, "N": "Spatial Destabilization Battery",               "G": "Electronic Warfare Battery", "O": 15901 },',
'{"I": 27579, "N": "Dread Guristas Phase Inversion Battery",        "G": "Electronic Warfare Battery", "O": 15902 },',
'{"I": 17175, "N": "Phase Inversion Battery",                       "G": "Electronic Warfare Battery", "O": 15903 },',
'{"I": 27577, "N": "Guristas Phase Inversion Battery",              "G": "Electronic Warfare Battery", "O": 15904 },',
'{"I": 27585, "N": "Dread Guristas White Noise Generation Battery", "G": "Electronic Warfare Battery", "O": 15905 },',
'{"I": 17174, "N": "Ion Field Projection Battery",                  "G": "Electronic Warfare Battery", "O": 15906 },',
'{"I": 27576, "N": "Dread Guristas Ion Field Projection Battery",   "G": "Electronic Warfare Battery", "O": 15907 },',
'{"I": 27583, "N": "Guristas White Noise Generation Battery",       "G": "Electronic Warfare Battery", "O": 15908 },',
'{"I": 27574, "N": "Guristas Ion Field Projection Battery",         "G": "Electronic Warfare Battery", "O": 15909 },',
'{"I": 27582, "N": "Dread Guristas Spatial Destabilization Battery","G": "Electronic Warfare Battery", "O": 15910 },',
'{"I": 17177, "N": "White Noise Generation Battery",                "G": "Electronic Warfare Battery", "O": 15911 },',
'{"I": 27580, "N": "Guristas Spatial Destabilization Battery",      "G": "Electronic Warfare Battery", "O": 15912 },',

// damps
'{"I": 27778, "N": "Serpentis Sensor Dampening Battery",            "G": "Sensor Dampening Battery",   "O": 16001 },',
'{"I": 17180, "N": "Sensor Dampening Battery",                      "G": "Sensor Dampening Battery",   "O": 16002 },',
'{"I": 27779, "N": "Shadow Sensor Dampening Battery",               "G": "Sensor Dampening Battery",   "O": 16003 },',

///////////////////////////////////////////////////////////// POS Mods - Industry /////////////////////////////////////
'{"I": 16221, "N": "Moon Harvesting Array",                         "G": "Moon Mining",                "O": 20001 },',

// assembly arrays
'{"I": 24575, "N": "Capital Ship Assembly Array",                   "G": "Assembly Array",             "O": 20101 },',
'{"I": 24655, "N": "Advanced Medium Ship Assembly Array",           "G": "Assembly Array",             "O": 20102 },',
'{"I": 24654, "N": "Medium Ship Assembly Array",                    "G": "Assembly Array",             "O": 20103 },',
'{"I": 24653, "N": "Advanced Small Ship Assembly Array",            "G": "Assembly Array",             "O": 20104 },',
'{"I": 30389, "N": "Subsystem Assembly Array",                      "G": "Assembly Array",             "O": 20105 },',
'{"I": 24657, "N": "Advanced Large Ship Assembly Array",            "G": "Assembly Array",             "O": 20106 },',
'{"I": 24574, "N": "Small Ship Assembly Array",                     "G": "Assembly Array",             "O": 20107 },',
'{"I": 24656, "N": "X-Large Ship Assembly Array",                   "G": "Assembly Array",             "O": 20108 },',
'{"I": 29613, "N": "Large Ship Assembly Array",                     "G": "Assembly Array",             "O": 20109 },',
'{"I": 25305, "N": "Drug Lab",                                      "G": "Assembly Array",             "O": 20110 },',
'{"I": 13780, "N": "Equipment Assembly Array",                      "G": "Assembly Array",             "O": 20111 },',
'{"I": 24660, "N": "Component Assembly Array",                      "G": "Assembly Array",             "O": 20112 },',
'{"I": 24659, "N": "Drone Assembly Array",                          "G": "Assembly Array",             "O": 20113 },',
'{"I": 24658, "N": "Ammunition Assembly Array",                     "G": "Assembly Array",             "O": 20114 },',
'{"I": 16220, "N": "Rapid Equipment Assembly Array",                "G": "Assembly Array",             "O": 20115 },',

// labs
'{"I": 28351, "N": "Advanced Mobile Laboratory",                    "G": "Mobile Laboratory",          "O": 20201 },',
'{"I": 32245, "N": "Hyasyoda Mobile Laboratory",                    "G": "Mobile Laboratory",          "O": 20202 },',
'{"I": 24567, "N": "Experimental Laboratory",                       "G": "Mobile Laboratory",          "O": 20203 },',
'{"I": 16216, "N": "Mobile Laboratory",                             "G": "Mobile Laboratory",          "O": 20204 },',

// refining arrays
'{"I": 19470, "N": "Intensive Refining Array",                      "G": "Refining Array",             "O": 20301 },',
'{"I": 12239, "N": "Medium Intensive Refining Array",               "G": "Refining Array",             "O": 20302 },',
'{"I": 12238, "N": "Refining Array",                                "G": "Refining Array",             "O": 20303 },',

// silos
'{"I": 28884, "N": "Expanded Silo",                                 "G": "Silo",                       "O": 20401 },',
'{"I": 25280, "N": "Hazardous Chemical Silo",                       "G": "Silo",                       "O": 20402 },',
'{"I": 28314, "N": "Reception Center",                              "G": "Silo",                       "O": 20403 },',
'{"I": 28317, "N": "Freedom Hospital",                              "G": "Silo",                       "O": 20404 },',
'{"I": 28316, "N": "Slave Pen",                                     "G": "Silo",                       "O": 20405 },',
'{"I": 25270, "N": "Biochemical Silo",                              "G": "Silo",                       "O": 20406 },',
'{"I": 28315, "N": "Holding Pen",                                   "G": "Silo",                       "O": 20407 },',
'{"I": 14343, "N": "Silo",                                          "G": "Silo",                       "O": 20408 },',
'{"I": 30655, "N": "Hybrid Polymer Silo",                           "G": "Silo",                       "O": 20409 },',
'{"I": 25821, "N": "General Storage",                               "G": "Silo",                       "O": 20410 },',
'{"I": 25271, "N": "Catalyst Silo",                                 "G": "Silo",                       "O": 20411 },',
'{"I": 17764, "N": "Ultra Fast Silo",                               "G": "Silo",                       "O": 20412 },',
'{"I": 17982, "N": "Coupling Array",                                "G": "Silo",                       "O": 20413 },',

// reactors
'{"I": 24684, "N": "Biochemical Reactor Array",                     "G": "Mobile Reactor",             "O": 20501 },',
'{"I": 16869, "N": "Complex Reactor Array",                         "G": "Mobile Reactor",             "O": 20502 },',
'{"I": 28318, "N": "Trauma Treatment Facility",                     "G": "Mobile Reactor",             "O": 20503 },',
'{"I": 22634, "N": "Medium Biochemical Reactor Array",              "G": "Mobile Reactor",             "O": 20504 },',
'{"I": 30656, "N": "Polymer Reactor Array",                         "G": "Mobile Reactor",             "O": 20505 },',
'{"I": 20175, "N": "Simple Reactor Array",                          "G": "Mobile Reactor",             "O": 20506 },',
'{"I": 28319, "N": "Vitoc Injection Center",                        "G": "Mobile Reactor",             "O": 20507 },',
'{"I": 20176, "N": "Academy",                                       "G": "Mobile Reactor",             "O": 20508 },',

///////////////////////////////////////////////////////////// POS - unknown ////////////////////////////////////////////
'{"I": 27676, "N": "Structure Repair Array",                        "G": "Structure Repair Array",     "O": 25001 },',
'{"I": 28191, "N": "Target Painting Battery",                       "G": "Target Painting Battery",    "O": 25002 },',
'{"I": 17701, "N": "Tracking Array",                                "G": "Tracking Array",             "O": 25003 },',
'{"I": 17899, "N": "Stealth Emitter Array",                         "G": "Stealth Emitter Array",      "O": 25004 },',
'{"I": 18586, "N": "BH Structure Anchoring Array",                  "G": "Stealth Emitter Array",      "O": 25005 },',
'{"I": 16223, "N": "Shield Generation Array",                       "G": "Mobile Shield Generator",    "O": 25006 },',
'{"I": 16217, "N": "Small Auxiliary Power Array",                   "G": "Mobile Power Core",          "O": 25007 },',
'{"I": 17173, "N": "Large Auxiliary Power Array",                   "G": "Mobile Power Core",          "O": 25008 },',
'{"I": 17172, "N": "Medium Auxiliary Power Array",                  "G": "Mobile Power Core",          "O": 25009 },',

///////////////////////////////////////////////////////////// Deployable items ///////////////////////////////////////
// misc
'{"I": 4386,  "N": "Mobile Large Jump Disruptor I",                 "G": "Mobile Jump Disruptor",      "O": 50001 },',
'{"I": 33476, "N": "Mobile Cynosural Inhibitor",                    "G": "Mobile Cyno Inhibitor",      "O": 50002 },',
'{"I": 16219, "N": "Small Storage Array",                           "G": "Mobile Storage",             "O": 50003 },',
'{"I": 12240, "N": "Medium Storage Array",                          "G": "Mobile Storage",             "O": 50004 },',
'{"I": 33149, "N": "Personal Hangar Array",                         "G": "Personal Hangar",            "O": 50005 },',
'{"I": 33475, "N": "Mobile Tractor Unit",                           "G": "Mobile Tractor Unit",        "O": 50006 },',

// mobile siphons
'{"I": 33477, "N": "Small Mobile Siphon Unit",                      "G": "Mobile Siphon Unit",         "O": 50101 },',
'{"I": 33479, "N": "Large Mobile Siphon Unit",                      "G": "Mobile Siphon Unit",         "O": 50102 },',
'{"I": 33478, "N": "Medium Mobile Siphon Unit",                     "G": "Mobile Siphon Unit",         "O": 50102 },',

// deployable bubbles
'{"I": 26888, "N": "Mobile Large Warp Disruptor II",                "G": "Mobile Warp Disruptor",      "O": 50201 },',
'{"I": 26849, "N": "Tournament Bubble TEST",                        "G": "Mobile Warp Disruptor",      "O": 50202 },',
'{"I": 12200, "N": "Mobile Large Warp Disruptor I",                 "G": "Mobile Warp Disruptor",      "O": 50203 },',
'{"I": 28770, "N": "Syndicate Mobile Large Warp Disruptor",         "G": "Mobile Warp Disruptor",      "O": 50204 },',
'{"I": 26890, "N": "Mobile Medium Warp Disruptor II",               "G": "Mobile Warp Disruptor",      "O": 50205 },',
'{"I": 12199, "N": "Mobile Medium Warp Disruptor I",                "G": "Mobile Warp Disruptor",      "O": 50206 },',
'{"I": 28772, "N": "Syndicate Mobile Medium Warp Disruptor",        "G": "Mobile Warp Disruptor",      "O": 50207 },',
'{"I": 26892, "N": "Mobile Small Warp Disruptor II",                "G": "Mobile Warp Disruptor",      "O": 50208 },',
'{"I": 12198, "N": "Mobile Small Warp Disruptor I",                 "G": "Mobile Warp Disruptor",      "O": 50209 },',
'{"I": 28774, "N": "Syndicate Mobile Small Warp Disruptor",         "G": "Mobile Warp Disruptor",      "O": 50210 },',

// mobile depots
'{"I": 33522, "N": "\'Yurt\' Mobile Depot",                         "G": "Mobile Depot",               "O": 50301 },',
'{"I": 33520, "N": "\'Wetu\' Mobile Depot",                         "G": "Mobile Depot",               "O": 50302 },',
'{"I": 33474, "N": "Mobile Depot",                                  "G": "Mobile Depot",               "O": 50303 },',

'{"I": 3742,   "N": "Gallente Sentry Gun",                           "G": "Sentry Guns",               "O": 50303 },',

///////////////////////////////////////////////////////////// End of Known Data /////////////////////////////////
'{"I": 0,     "N": "Unknown",                                       "G": "Unknown",                    "O": 999999 }',
']' ].join( '' ); 
  return jQuery.parseJSON( data );
}

