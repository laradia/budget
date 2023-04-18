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
exports.add_dep = function(type_dep,mt_dep) {
    let result = db.prepare('INSERT INTO depenses (type_dep, mt_dep) VALUES (?, ?)').run(type_dep,mt_dep);
    return result;
  }

//update user


//update depense


//delete depense
exports.delete = function(id_user) {
    db.prepare('DELETE FROM depenses WHERE id_user = ?').run(id_user);
}

exports.getNom = (id_user) => {
  var nom = db.prepare('SELECT nom FROM user WHERE (id_user = @id_user)').get({id_user : id_user});
  return nom;
}

exports.getPrenom = (id_user) => {
  var prenom = db.prepare('SELECT prenom FROM user WHERE (id_user = @id_user)').get({id_user : id_user});
  return prenom;
}

exports.getEmail = (id_user) => {
  var email = db.prepare('SELECT email FROM user WHERE (id_user = @id_user)').get({id_user : id_user});
  return email;
}

exports.getUserData = (id_user) => {
  var data = db.prepare('SELECT * FROM user WHERE (id_user = @id_user)').get({id_user : id_user});
  return data;
}

exports.read = (email) => {
  let found = db.prepare('SELECT * FROM user WHERE email = ?').get(email);
  if (found !== undefined) {
  
    return found;
  } else {
    return null;
  }
};


