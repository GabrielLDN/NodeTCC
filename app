// const express = require('express')
// const mysql = require('mysql')

// const app = express()

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user:'root',
//     password:'',
//     database: 'banco_func'

// });

// connection.connect(error => {
//     if(error) throw error;
//     console.log('Conectado ao banco de dados MySQL');

// });

// app.set('view engine', 'ejs')

// app.use(express.urlencoded({extended:false}))
// app.use(express.static(__dirname + '/public'))

// app.get('/',(req,res) => {
//     const query = 'SELECT * FROM funcionarios';
//     connection.query(query,(error,rows) => {
//         if(error) throw error;
//         res.render('index',{rows});

//     });
    
// });

// app.listen(3000,() => {
//     console.log('server on')
// })