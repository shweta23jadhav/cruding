const express = require("express")
const app = express()
const port = 3000;
let knex =require ( "knex" )

const knex2 = knex({
    client: 'pg',
    connection: {
      connectionString:"postgres://shweta_0jtu_user:QnZGVlrzfW3qv4Q978Rv5uQ2CUSfyfbS@dpg-cju12ap5mpss73b18i4g-a.oregon-postgres.render.com/shweta_0jtu",
      host: "dpg-cju12ap5mpss73b18i4g-a.oregon-postgres.render.com",
      port:5432,
      user: "shweta_0jtu_user",
      database: "shweta_0jtu",
      password: "QnZGVlrzfW3qv4Q978Rv5uQ2CUSfyfbS",
      ssl: true,
    }
  });

  app.get("/ShowData",(req,res)=>{
    setTimeout(async () =>{
      let result= await knex2.select("id").from("student");
      console.log(result);
      res.send(result)
    },3000);
  })
    
  app.listen(port,()=>{
    console.log(`Listening to port http://localhost:${port}`);
  })
  
