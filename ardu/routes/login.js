express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
res.render('login', {title: 'Member login'});
});
module.exports = router;
