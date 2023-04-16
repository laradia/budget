let express = require('express');
let mustache = require('mustache-express');

let app = express();
app.use(express.static(__dirname + '/public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', './views');

app.get('/', (req, res) => {
   
    res.render('log');
     
  });

app.listen(3000, () => console.log('listening on http://localhost:3000'));
