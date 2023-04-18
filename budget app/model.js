"use strict"

const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');
const fs = require('fs');

//login
exports.login = function(email, password) {
  let result = db.prepare('SELECT id_user FROM user WHERE email = ? AND password = ?').get(email, password);
  if (result === undefined) return -1;
  return result.id_user;
}

//sign up
exports.sign_up = function(nom,prenom,email,password) {
  let result = db.prepare('INSERT INTO user (nom,prenom,email,password) VALUES (?, ?,?,?)').run(nom,prenom,email,password);
  return result.lastInsertRowid;
}

//creation d'une depense
exports.create = function(depenses) {
    let id = db.prepare('INSERT INTO depenses (type_dep, mt_dep) VALUES (@type_dep, @mt_dep)').run(depenses).lastInsertRowid;
    return id;
  }

//update user
exports.update = function(id, email) {
    var result = db.prepare('UPDATE user SET nom = @nom, prenom = @prenom, email = @email, password = @password,budget = @budget  WHERE id = ?').run(user, id);
    if(result.changes == 1) {
      var insert = db.prepare('INSERT INTO user VALUES (@nom, @prenom, @email,@password,@budget)');
      
  
      return true;
    }
    return false;
  }  

//update depense


//delete depense
exports.delete = function(id) {
    db.prepare('DELETE FROM depenses WHERE id = ?').run(id);
}