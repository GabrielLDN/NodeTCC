const express = require('express')
const mysql = require('mysql')

const app = express()

const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database: 'banco_func'
});

connection.connect(error => {
    if(error) throw error;
    console.log('Conectado ao banco de dados MySQL');

});

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:false}))
app.use(express.static(__dirname + '/public'))

app.get('/',(req,res) => {
    const query = 'SELECT * FROM funcionarios';
    connection.query(query,(error,rows) => {
        if(error) throw error;
        res.render('index',{rows});

    });
    
});

app.post('/create',(req,res) => {
    const {campo1, campo2, campo3} = req.body;
    const query = `INSERT INTO funcionarios(Nome,Cargo,URL) VALUES(?,?,?)`;
    connection.query(query,[campo1, campo2, campo3],(error, result) => {
        if(error) throw error;

        res.redirect('/');
    });
});
app.get('/edit/:id',(req,res) => {
    const {id} = req.params;
    const query = `SELECT * FROM funcionarios WHERE id = ?`;
    connection.query(query,[id],(error, rows) => {
        if(error) throw error;
        res.render('edit',{row: rows[0]});
    });
});

app.post('/edit/:id',(req,res) => {
    const {id} = req.params;
    const {campo1, campo2, campo3} = req.body;
    const query = `UPDATE funcionarios SET Nome = ?, Cargo = ?, URL = ? WHERE id = ?`;
    connection.query(query,[campo1, campo2, campo3, id],(error, result) => {
        if(error) throw error;
        res.redirect('/');
    });
});

app.get('/delete/:id',(req,res) => {
    const {id} = req.params;
    const query = `DELETE FROM funcionarios WHERE id = ?`;
    connection.query(query,[id],(error, result) => {
        if(error) throw error;
        res.redirect('/');
    });
});
// LEMBRAR DE NUNCA DELETAR SEM WHERE , DE PREFERENCIA N USAR O DELETE
// // app.get('/delete_all',(req,res) => {
// //     const {id} = req.params;
// //     const query = `DELETE FROM funcionarios`;
// //     connection.query(query,[id],(error, result) => {
// //         if(error) throw error;
// //         res.redirect('/');
// //     });
// // });


app.get('/create',(req,res) => {
    res.render('create');
});

app.listen(3000,() => {
    console.log('server on')
})