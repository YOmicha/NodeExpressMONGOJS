const _ = require('lodash');

module.exports =  function(app){
    _cats = [];


    


    //create
    app.post('/cat', function(req, res){
        _cats.push(req.body);
        res.json({info: 'cat created succcessfully'});
    });

    //read
    app.get('/cat', function(req, res){
        res.send(_cats);
    });

    app.get('/cat/:id', function(req, res){
        res.send(
            _.find(
                _cats,{
                    name: res.param.id
                }          
            )
        );
    });

    //update cat
    app.put('/cat/:id',function(req, res){
        var index = _.findIndex(
            _cats,{
                name: req.param.id
            }
        );
        _.merge(_cats(index), req.body);
        res.json({info: 'cat updated successfully'});
    });

    //delete
    app.delete('/cat/:id', function(req, res){
        _.remove(
            _cats,function(cat){
                return cat.name === res.param.id;
            });
            res.json({info: 'cat removed succesfull'});    
    });

}