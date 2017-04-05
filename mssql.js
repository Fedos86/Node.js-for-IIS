var express = require('express');
var router = express.Router();
var sql = require('mssql');
var bodyParser = require('body-parser');

var config = {
    server: '', //server's IP or instance
    database: '', //database name
    port: 1433, //port
    user: '', //sql user
    password: '' //sql name
};

router.get('/recordslist', function(req, res) {
    sql.connect(config, function(err) {
        if (err) console.log(err);//query
        var request = new sql.Request();
        request.query('select * from Data', function(err, docs) {
            if (err) console.log(err);
            res.json(docs);
        });
    });
});

router.post('/addrecord', function(req, res) {
            bodyParser.json();
            var name = req.body.name;
            var url = req.body.url;
            var date = req.body.date;
            sql.connect(config, function(err) {
            if (err) console.log(err)
            //query
            var request = new sql.Request();
            request.input('name', name);
            request.input('url', url);
            request.input('date', sql.Date, date);
            request.query("INSERT into Data (name,url,date) VALUES(@name,@url,@date)", function(err) {
                if (err == null) {
                    res.send({ msg: 'ok' });
                } else {
                res.send({ msg: err });
                }
            });
    });
});

router.delete('/deleterecord/:id', function(req, res) {
        var id = req.params.id;
        sql.connect(config, function(err) {
        if (err) console.log(err);
        // query
        var request = new sql.Request();
        request.input('id', id);
        request.query('DELETE FROM Data WHERE id=@id', function(err) {
            if (err == null) {
                res.send({ msg: 'ok' });
            } else {
                res.send({ msg: 'wrong' });
            }
        });
    });
});

module.exports = router;