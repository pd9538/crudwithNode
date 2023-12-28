const express=require('express');
const router=express.Router();
const controller=require('./controller');

router.post('/create',controller.createData);
router.post('/getdoc',controller.getData);
router.post('/delete',controller.deleteDatabyid);
router.post('/getdocid',controller.getDatabyid);


module.exports=router;