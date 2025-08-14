//dependencies
const express=require('express'); // load the express js framework
const bodyParser=require('body-parser'); //middle ware request body -json
const cors=require('cors');//middle ware to allow the cross origin access(front end 4200<->back end 3000)
const mysql=require('mysql2');// node package to connect the mysql db


const app=express();
const port=3000;
app.use(cors()); //defining the cors for the application
app.use(bodyParser.json()) // pareses the json in HTTP request body


//establish connection with the db
const db= mysql.createConnection({
host:'localhost',
user:'root',
password:'root',
database:'client_management'
});




//verify the connectivity
db.connect(err=>{
    if(err){
        console.error('connection failed check the db details ',err)
    }
    else{
        console.log('connection is done with the mysql database')
    }
});


//response statement to check the express hitting the db or not
app.listen(port,()=>{console.log('server port is up on 3000')})


function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(403).json({ error: 'Token required' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user; // user contains id & email from token
        next();
    });
}




app.get('/getClientProfile',verifyToken,(req,res)=>{
    const sql = 'select * from product';
    db.query(sql,(err,result)=>{
        if(err){
            console.log('Error in fetch product');
            res.status(500).json({error:'An error occure'})
        }
        else{
            res.status(200).json(result)
        }
    })
})




app.post('/addClientProfile', (req, res) => {
    const { name, email, password, repeat_password } = req.body;
    const role = 'c';

    const sql = 'INSERT INTO user_profile (name, email, password, repeat_password, role) VALUES (?, ?, ?, ?, ?)';

    db.query(sql, [name, email, password, repeat_password, role], (err, result) => {
        if (err) {
            console.error('Error in inserting profile:', err);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            res.status(200).json({ message: 'Profile Created successfully' });
        }
    });
});

// app.post('/login', (req, res) => {
//     const { email, password } = req.body;

//     const sql = 'SELECT * FROM user_profile WHERE email = ? AND password = ?';
//     db.query(sql, [email, password], (err, results) => {
//         if (err) {
//             console.error('Error checking login:', err);
//             return res.status(500).json({ error: 'An error occurred' });
//         }

//         if (results.length > 0) {
//             res.status(200).json({ message: 'Login successful', user: results[0] });
//         } else {
//             res.status(401).json({ error: 'Invalid email or password' });
//         }
//     });
// });

require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM user_profile WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('Error checking login:', err);
            return res.status(500).json({ error: 'An error occurred' });
        }

        if (results.length > 0) {
            const user = results[0];

            // Create JWT token (valid for 1 hour)
            const token = jwt.sign(
                { id: user.id, email: user.email },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(200).json({
                message: 'Login successful',
                token: token
            });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    });
});

app.put('/editProfile',verifyToken,(req, res) => {
    const { id,name, email, password, repeat_password,role } = req.body;
    
    const sql = 'INSERT INTO user_profile (name, email, password, repeat_password,) VALUES (?, ?, ?, ?,?)';
    
    db.query(sql, [name, email, password, repeat_password,role,id], (err, result) => {
        if (err) {
            console.error('Error in updating profile data:', err);
            res.status(500).json({ error: 'An error occurred while updating' });
        } else {
            res.status(200).json({ message: 'Profile updated successfully' });
        }
    });
});

app.get('/getClientProfile/:id',verifyToken,(req,res)=>{
    
    const id = req.params.id;
    const sql = 'select * from user_profile where id=?';
    db.query(sql,[id],(err,result)=>{
        if(err){
            console.log('Error in fetch Client profile');
            res.status(500).json({error:'An error occure'})
        }
        else{
            res.status(200).json(result)
        }
    })
})



app.post('/createMeeting',verifyToken,(req, res) => {
    const { client_id, meeting_topic, start_time, number_of_people } = req.body;
    
    const sql = 'INSERT INTO client_meeting (client_id, meeting_topic, start_time, number_of_people) VALUES (?, ?, ?, ?)';
    
    db.query(sql, [client_id, meeting_topic, start_time, number_of_people], (err, result) => {
        if (err) {
            console.error('Error in inserting meeting data:', err);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            res.status(200).json({ message: 'Meeting Created successfully' });
        }
    });
});








app.put('/updategetClientProfile',(req,res)=>{
    
    const {id,name,orderdate ,ordertime } = req.body;
    const sql = 'update product set name=? ,orderdate=?,ordertime=? where id=?';
    db.query(sql,[name,orderdate,ordertime,id],(err,result)=>{
        if(err){
            console.log('Error in fetch product');
            res.status(500).json({error:'An error occure'})
        }
        else{
            res.status(200).json({message:'Product data updated successfuly'})
        }
    })
})


app.delete('/deletegetClientProfile/:id',(req,res)=>{
    const id=req.params.id
const sql='delete from product where id=?';
db.query(sql,[id],(err,result)=>{
    if(err){
        console.error('Error in deleting the product',err);
        res.status(500).json({error:'An error occured'})
    }
    else{
        res.status(200).json({message:'Product deleted successfully'});
    }
})
})
