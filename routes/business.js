var express = require('express');
var router = express.Router();
let businessController = require('../controller/business');
/* GET home page. */
router.get('/',businessController.displayBusinessList,function(req,res){

        res.render('business', { title: 'About Me' });
        
});

/*GET Route for displaying the Edit page - UPDATE operation*/
router.post('/edit',businessController.EditBusiness);
router.get('/deletebusiness/:id',businessController.DeleteBusiness);
module.exports = router;
