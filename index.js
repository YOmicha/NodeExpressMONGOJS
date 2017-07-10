/*var http = require('http');

http.createServer(function(req, res){
    res.writeHead(200,{
        'Content-type':'text/plain'
    });
    res.end('hello world');
}).listen(3000,'127.0.0.1');

console.log('server running in 127.0.0.1:3000');*/

const express =  require('express');
const bodyParser =  require('body-parser');
const mongoose =  require('mongoose');
const jwt =  require('jsonwebtoken');


const app = express();
var secureRouters =  express.Router();
const port = 3000;
var dataController =  require('./server/controller/data.controller');
var authenticateController =  require('./server/controller/authenticate.controller')

process.env.SECRET_key = 'MYSECRETAPIKEY'


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/secure-api', secureRouters);


var config = require('./server/mongo.js');
config.setConfig();
mongoose.connect(process.env.MONGOOSE_CONNECT);

//get data
    app.get('/api/authenticate', authenticateController.authenticate)
    app.get('/api/get-data', dataController.getData);

//validation middelware
    secureRouters.use(function(req, res, next){
        var token =  req.body.token || req.headers['token'];
    if(token){
        //res.send('we have the token');
        jwt.verify(token, process.env.SECRET_key, function(err, decode){
            if(err){
               res.status(500).send('invalid token');    
            }else{
                next();
            }
        })
    }else{
        res.send('please send token');
    }
})
    secureRouters.post('/post-data', dataController.postData);


const cats =  require('./cat')(app);

/*app.get('/',function(req, res){
    res.send('hello world');
    //res.json({hello:'hello world' });
});
*/


const server =  app.listen(port, function(){
    console.log('server running at 127.0.0.1:6000');
});

