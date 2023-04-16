"use strict";

const fs = require('fs');
const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');

let entries = JSON.parse(fs.readFileSync('data.json').toString());
let load = function(filename) {
  const recipes = JSON.parse(fs.readFileSync(filename));

  db.prepare('DROP TABLE IF EXISTS user').run();
  db.prepare('DROP TABLE IF EXISTS depenses').run();
  

  db.prepare('CREATE TABLE user (id_user INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, prenom TEXT, email TEXT, password TEXT, budget REAL,FOREIGN KEY (id_dep) REFERENCES depenses)').run();
  db.prepare('CREATE TABLE depenses (id_dep INTEGER PRIMARY KEY AUTOINCREMENT, type_dep TEXT, mt_dep REAL)').run();

   

 
  

 
}

load('data.json');

