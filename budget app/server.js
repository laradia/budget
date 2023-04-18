"use strict";
let express = require('express');
let model = require('./model');
let mustache = require('mustache-express');

let app = express();
app.use(express.static(__dirname + '/public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', './views');

const cookieSession = require('cookie-session');
app.use(cookieSession({
  secret: 'mot-de-passe-du-cookie',
}));

function is_authenticated(req, res, next) {
  if (req.session.user != null) { 
    res.locals.authenticated = true; 
  } else { 
    res.locals.authenticated = false; 
  }
  next();

}

function is_not_authenticated(req, res, next) {
  if (req.session.user != null) { 
    res.locals.is_not_authenticated = false; 
  } else { 
    res.locals.is_not_authenticated = true; 
  }
  next();
};



// middleware qui ajoute deux variables de session aux templates : authenticated et le nom de l'utilisateur
app.use(function(req, res, next) {
  if (req.session.user !== undefined) {
    res.locals.authenticated = true;
    res.locals.name = req.session.name;
  }
  return next();
});


app.get('/', is_authenticated, is_not_authenticated, (req, res) => {
   
    res.render('log');
     
  });

  app.post('/signup', (req, res) => {
    const result = model.sign_up(req.body.nom,req.body.prenom,req.body.email, req.body.password);
    if (result.error) {
      // user already exists, display error message
      res.render('/', { error: result.error });
    } else {
      // user successfully created, redirect to homepage
      req.session.user = result;
      req.session.name = req.body.user;
      res.redirect('/Dashboard');
    }
  });
  
  
  
  app.post('/login', (req, res) => {
    const user = model.login(req.body.email, req.body.password);
    if (user != -1) {
      
      let userID = user.id_user;
      req.session.user = userID;

      res.redirect('/Dashboard');
    } else {
      res.redirect('/');
    }
  });
  
  app.get('/signup', (req, res) => {
    res.render('log');
  });
  
  app.get('/login',is_authenticated, (req, res) => {
    res.render('log');
  });

  app.get('/Dashboard', (req, res) => {
    res.render('Dash');
  });

  app.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/');
  });

  

  

  app.get('/profile', (req, res) => {
    
    res.render('profile');
  });



  app.post('/create_dep', (req, res) => {
    const result = model.add_dep(req.body.type_dep,req.body.mt_dep);
   /* if (result.error) {
      
      res.render('/Dashboard', { error: result.error });
    } else {
      
      //res.redirect('/Dashboard');
    }*/
  });
  



 




 
  
 

app.listen(2000, () => console.log('listening on http://localhost:2000'));
