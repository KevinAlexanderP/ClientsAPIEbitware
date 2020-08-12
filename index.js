const express = require('express')
const app = express()
const port = process.env.PORT || 3003
const { check, validationResult } = require('express-validator');

app.use(express.json())


var clients = [

    {id: 0, nombre: 'Alejandro ', 
    Apellidos: 'Iñiesta',
     Nombre_Usuario: 'AI-22' ,
     Correo_Electronico:"aiñiesta@gmail.com",
     Contraseña: "password",
     Edad:"20",
     Estatura:"1.80",
     Peso:"80",
     IMC:"40",
     EGB: "lalalala",
     ETA: "Hello",
     Fecha_Creacion:"22-04-2022",
     Fecha_Actualizacion : "22-04-2022",
    
    },
   
]
 
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/NutriNET/client/list',(req, res)=>{
    res.send(['BMW X1', 'AUDI A3', 'Mercedes Clase A'])
})

app.get('/NutriNET/client/id/:id',(req, res)=>{
    res.send(req.params.id)
})

app.get('/NutriNET/client/:nombre/:Apellidos',(req, res)=>{
    res.send(req.params)
})

app.get('/NutriNET/client/', (req, res)=> {
    res.send(clients)
})

app.get('/NutriNET/client/:nombre', (req, res)=>{
    const client = clients.find(client => client.nombre === req.params.nombre)

    if(!client){
        res.status(404).send('No tenemos ningun client de esa marca')
    }else{
        res.send(client)
    }
})

app.post('/NutriNET/client', (req, res)=>{
    var clientId = clients.length;
    var client ={
        id: clientId,
        nombre: req.body.nombre,
        Apellidos: req.body.Apellidos,
        Nombre_Usuario: req.body.Nombre_Usuario,
        Correo_Electronico: req.body.Correo_Electronico,
        Contraseña: req.body.Contraseña,
        Edad:req.body.Edad,
        Estatura:req.body.Estatura,
        Peso:req.body.Peso,
        IMC:req.body.IMC,
        EGB: req.body.EGB,
        ETA: req.body.ETA,
        Fecha_Creacion: req.body.Fecha_Creacion,
        Fecha_Actualizacion : req.body.Fecha_Actualizacion,
    }
    clients.push(client)
    res.status(201).send(client)

})

// app.post('/api/client2', (req, res)=>{
//     // if(!req.body.nombre || req.body.nombre.length < 3 ){
//     //     res.status(400).send('Introduce la empresa correcto')
//     //     return
//     // }

//     var carId = clients.length;
//     var client ={
//         id: carId,
//         nombre: req.body.nombre,
//         Apellidos: req.body.Apellidos,
//         Nombre_Usuario: req.body.Nombre_Usuario
//     }
    
//     clients.push(client)
//     res.send(client)

// })

// app.post('/api/client3', [
//     check('nombre').isLength({min: 3}),
//     check('Apellidos').isLength({min: 3})
// ],(req, res)=>{
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(422).json({ errors: errors.array() });
//     }

//     var carId = clients.length;
//     var client ={
//         id: carId,
//         nombre: req.body.nombre,
//         Apellidos: req.body.Apellidos,
//         Nombre_Usuario: req.body.Nombre_Usuario
//     }
    
//     clients.push(client)
//     res.status(201).send(client)

// })

app.put('/NutriNET/client/:id', [
    check('nombre').isLength({min: 3}),
    check('Apellidos').isLength({min: 3})
],(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const client = clients.find(client=> client.id === parseInt(req.params.id))

    if(!client){
        return res.status(404).send('El client con ese ID no esta')
    }

    client.nombre = req.body.nombre
    client.Apellidos = req.body.Apellidos
    client.Nombre_Usuario = req.body.Nombre_Usuario
    client.Correo_Electronico= req.body.Correo_Electronico
    client.Contraseña = req.body.Contraseña,
    client.Edad=req.body.Edad,
    client.Estatura=req.body.Estatura,
    client.Peso=req.body.Peso,
    client.IMC=req.body.IMC,
    client.EGB= req.body.EGB,
    client.ETA= req.body.ETA,
    client.Fecha_Creacion= req.body.Fecha_Creacion,
    client.Fecha_Actualizacion = req.body.Fecha_Actualizacion,
    
    
    res.status(204).send()

})

app.delete('/NutriNET/client/:id', (req, res)=>{
    const client = clients.find(client=> client.id === parseInt(req.params.id))

    if(!client){
        return res.status(404).send('El client con ese ID no esta, no se puede borrar')
    }

    const index = clients.indexOf(client)
    clients.splice(index,1)
    res.status(200).send('client borrado')

})

app.listen(port, ()=> console.log('Escuchando Puerto: ' + port))