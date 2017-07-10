var Person = require('../model/person.js');

module.exports.getData =  function(req, res){
    Person.find({}, function(err, people){
        if(err){
            return res.status(500).send("no query");
        }
        res.json({data:people});
    })
}


module.exports.postData =  function(req, res){
    var person = new Person(req.body);
    person.save(function(err){
        if(err){
          return res.status(500).send("new person NO added")
        }
        res.status(200).send("new person added")

    })
}