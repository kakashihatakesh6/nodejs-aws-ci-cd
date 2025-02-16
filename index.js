const express = require('express');
const app = express()

const port = 3000;
app.use(express.json());

app.listen(port, () => {
    console.log("Server is running on ", port); 
})  

const productList = [
{
    id: "340xHt3404YU35AUA",
    name: "Samsung Galaxy S-25",
    storage: "128GB",
    ram: "8GB",
    description: "latest phone of samsung"
},
{
    id: "xYH45hg3703H",
    name: "Real me 14 pro max",
    storage: "128 GB",
    ram: "8 GB",
    description: "latest realme phone"
}
]

app.get("/", (req, res) => {
    res.send("server is running file here at '/' ");

})

app.get("/products", (req, res) => {
   res.status(200).json({status: true, data: productList});
})
