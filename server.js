const express =  require('express');
const bodyParser =  require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//const cats =  require('./cat')(app);


const server =  app.listen(port, function(){
    console.log('server running at 127.0.0.1:3000');
});
