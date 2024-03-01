const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection(process.env.DATABASE_URL);

// app.get("/", (req,res) => {
//     console.log("Hello Express!")
//     res.send("Hello");
// });
app.all("/", (req,res) => {
    console.log("Hello Express!")
    res.send("Hello");
});

app.get("/food",(req,res) => {
    connection.query("SELECT * FROM tbl_food", function(err,result,filds){
        res.send(result);
    });
});
app.get("/customer",(req,res) => {
    connection.query("SELECT * FROM tbl_customer", function(err,result,filds){
        res.send(result);
    });
});
app.get("/menu",(req,res)=>{
    connection.query("SELECT * FROM tbl_menu WHERE menuID", function(err,result,filds){
        res.send(result);
    })
})
app.get("/foodall",(req,res)=>{
    connection.query("SELECT tbl_food.*,tbl_menu.menuName FROM tbl_food INNER JOIN tbl_menu ON tbl_food.menuID = tbl_menu.menuID ", function(err,result,filds){
        res.send(result);
    })
})

app.post("/addmenu", function (req, res) {
    connection.query(" INSERT INTO `tbl_menu` (`menuID`,`menuName`) VALUES (?, ?)"
    ,[req.body.menuID, req.body.menuName],
   
      function (err, results) {
        if (err) throw err;
        return res.send({
          err: false,
          data: results,
          message: "New menu has been created successfully.",
        });
      }
    );
  });

app.listen(process.env.PORT || 5000);