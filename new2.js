// let knex =require ( "knex" )

// const knex2 = knex({
//     client: 'pg',
//     connection: {
//       connectionString:"postgres://users_fjuv_user:MnlVYGbkLj4rrnj1LiHVY62YnIbRZ3JB@dpg-cjrfss8jbais73cll54g-a.oregon-postgres.render.com/users_fjuv",
//       host: "dpg-cjrfss8jbais73cll54g-a.oregon-postgres.render.com",
//       port:5432,
//       user: "users_fjuv_user",
//       database: "users_fjuv",
//       password: "MnlVYGbkLj4rrnj1LiHVY62YnIbRZ3JB",
//       ssl: true,
//     }
//   });

//   setTimeout(async () =>{
//     let result= await knex2.select("id","name","gender","username").from("users");
//     console.log(result);
//   },3000);

// knexfile.js
const express = require('express');
const app = express();
const port =  2000;
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    port : 3306,
    user : 'root',
    password : '',
    database : 'users'
  }
});
// setTimeout(async () =>{
//       let result= await knex.select("id","userid","name","gender","username",).from("person");
//       // console.log(result);
//     },2000);
    app.get('/users',async (req, res) => {
      let result= await knex.select("id","userid","name","gender","username",).from("person");
        console.log(result);
        res.send(result);
      });
      app.get('/users/:id/:userid/:name/:gender/:username',async (req, res) => {
        let { id, userid, name, gender, username } = req.params;
      let insert = await knex('person').insert({
          id,
          userid,
          name,
          gender,
          username
        });
        console.log(insert);
        res.send({ id, userid, name, gender, username });
      });
      app.get('/users/:b/:name', async(req,res)=>{
        let  name=req.params.name;
        let  id=req.params.b;
        let up = await knex('person').where({id}).update({name});
        if (up) {
          console.log(`Updated ${up} record`);
          res.send({name:'updated'});
        } else {
          res.send({ message: 'not found' });
        }
      });
      app.get('/users/:b',async (req,res)=>{
        let  id=req.params.b;
        let del=await knex('person').where({id}).delete();
        if(del){
          console.log("deleted",del);
          res.send(`deleted:${del}`);
        }else{
          res.send("not deleted");
        }
      });
      app.get('/products', async (req, res) => {
          let po= await knex.select("id","product_id","product_name","type",).from("products");
            console.log(po);
            res.send(po);
          });
        app.get('/fav', async(req,res)=>{
          let favo=await knex.select("userid","product_id").from("fav");
          console.log(favo);
          res.send(favo);
        });
        app.get('/fav/:s',async (req, res) => {
          let id=req.params.s;
          let next=await knex.select("userid","product_id").from("fav")
            if (next) {
              console.log(next);
            }
            let data=next.filter(e=>e.userid==id);
            res.send(data);
          });
    

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });