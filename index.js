const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const routes=require('./routes/route');

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs') 
app.set('views','./views')
app.use('/',routes);
app.use(express.static("public"));

//Porta servidor
app.listen(8080,()=>{
console.log('Servidor on');
})