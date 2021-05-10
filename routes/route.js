const express=require('express');
const router=express.Router();
const etiqueta=require('../controllers/etiquetas');

//Rota POST
router.post('/etiqueta',etiqueta.gerar_html);

module.exports=router;