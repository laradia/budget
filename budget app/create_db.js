"use strict";


const Sqlite = require('better-sqlite3');
let db = new Sqlite('db.sqlite');



db.prepare('DROP TABLE IF EXISTS user').run();
db.prepare('DROP TABLE IF EXISTS depenses').run();
db.prepare('CREATE TABLE user (id_user INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, prenom TEXT, email TEXT, password TEXT, budget REAL,id_dep INTEGER ) ').run();
db.prepare('CREATE TABLE depenses (id_dep INTEGER PRIMARY KEY AUTOINCREMENT, type_dep TEXT, mt_dep REAL)').run();


let insert2 = db.prepare('INSERT INTO depenses VALUES (@id_dep, @type_dep, @mt_dep)');

 


