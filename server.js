const express=require ("express");
var app=express();
var hbs= require('express-handlebars');
app.engine( 'hbs', hbs( {
  extname: 'hbs',
  defaultLayout: '',
  layoutsDir: __dirname + '/views'
}));
app.listen(5000,()=>{
  console.log("server started....");
})
 app.set('view engine','hbs'); 

const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true
}));
const Login=require('./model/login');
const details=require('./model/details');
const URL="mongodb://localhost:27017/customer";
const mongoose=require('mongoose');
const { response } = require("express");
const { request } = require("http");
mongoose.connect(URL);

app.get('/register',(request,response)=>{
  response.render('details');
})
app.post('/register',(request,response)=>{
  var detail=details( {
  first_name:request.body.first_name,
  last_name:request.body.last_name,
  email:request.body.email,
  password:request.body.password,
  phone:request.body.phone,
  lat:request.body.lat,
  lon:request.body.lon,
  register_id:request.body.register_id,
  address:request.body.address,
  store_address:request.body.store_address,
  zipcode:request.body.zipcode,
  category_id:request.body.category_id,
  description:request.body.description,
  type:request.body.type
});
detail.save().then(data=>{
  details.find((err,result)=>{
    console.log(result);;
    if(err)throw err;
      else
      response.render('login',{data:result}); 
     // response.json({data:result})
      })
      });
    });

    app.get('/login',(request,response)=>{
      response.render('login');
    })
app.post('/login',(request,response)=>{
         details.findOne({password:request.body.password,email:request.body.email,
          lat:request.body.lat,lon:request.body.lon,register_id:request.body.register_id,
          type:request.body.type},(err,result)=>{
          console.log(result);
           if(err)throw err;
           else if(result!=null)
           {
           response.render('login',{msg:"Login Sucess"});
           }
           else{
           response.render('login',{msg:"Login Fail "});
       }
         });
       });

