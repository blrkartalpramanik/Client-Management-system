//dependencies
const express = require('express'); // load the express js framework
const bodyParser = require('body-parser'); //middle ware request body -json
const cors = require('cors');//middle ware to allow the cross origin access(front end 4200<->back end 3000)
const mysql = require('mysql2');// node package to connect the mysql db
const fetch = require('node-fetch');


const app = express();
const port = 3000;
app.use(cors()); //defining the cors for the application
app.use(bodyParser.json()) // pareses the json in HTTP request body


//establish connection with the db
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'client_management'
});




//verify the connectivity
db.connect(err => {
    if (err) {
        console.error('connection failed check the db details ', err)
    }
    else {
        console.log('connection is done with the mysql database')
    }
});


//response statement to check the express hitting the db or not
app.listen(port, () => { console.log('server port is up on 3000') })

//verify token for each api
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









//get client profile api

app.get('/getClientProfile', verifyToken, (req, res) => {
    const sql = 'select * from product';
    db.query(sql, (err, result) => {
        if (err) {
            console.log('Error in fetch product');
            res.status(500).json({ error: 'An error occure' })
        }
        else {
            res.status(200).json(result)
        }
    })
})



//Add client registration

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

//Auto generating token each time while login into dashboard

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
                token: token,
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            });
            ;
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    });
});


//adit client profile

app.put('/editProfile', verifyToken, (req, res) => {
    const { id, name, email, password, repeat_password, role } = req.body;

    const sql = 'INSERT INTO user_profile (name, email, password, repeat_password,) VALUES (?, ?, ?, ?,?)';

    db.query(sql, [name, email, password, repeat_password, role, id], (err, result) => {
        if (err) {
            console.error('Error in updating profile data:', err);
            res.status(500).json({ error: 'An error occurred while updating' });
        } else {
            res.status(200).json({ message: 'Profile updated successfully' });
        }
    });
});

//get client by id

app.get('/getClientProfile/:id', verifyToken, (req, res) => {

    const id = req.params.id;
    const sql = 'select * from user_profile where id=?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log('Error in fetch Client profile');
            res.status(500).json({ error: 'An error occure' })
        }
        else {
            res.status(200).json(result)
        }
    })
})


//create meeting

// app.post('/createMeeting', verifyToken, (req, res) => {
//     const { client_id, meeting_topic, start_time, number_of_people, phone, remarks } = req.body;

//     const sql = 'INSERT INTO client_meeting (client_id, meeting_topic, start_time, number_of_people,phone, remarks) VALUES (?, ?, ?, ?, ?, ?)';

//     db.query(sql, [client_id, meeting_topic, start_time, number_of_people, phone, remarks], (err, result) => {
//         if (err) {
//             console.error('Error in inserting meeting data:', err);
//             res.status(500).json({ error: 'An error occurred' });
//         } else {
//             res.status(200).json({ message: 'Meeting Created successfully' });
//         }
//     });
// });


//zoom meeting creation

const zoomAccountId = "aMBVo778R62OzTEKwGP2Ww";
const zoomClientId = "LlXtC4OLTmO17IKdb2X2fA";
const zoomClientSecret = "wXCZf4DX51xXdQ1p8OmwaOQJyW89iLre";

const getAuthHeaders = () => {
    const token = Buffer.from(`${zoomClientId}:${zoomClientSecret}`).toString("base64");
    return {
        Authorization: `Basic ${token}`,
        "Content-Type": "application/json",
    };
};

const generateZoomAccessToken = async () => {
    const response = await fetch(
        `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${zoomAccountId}`,
        {
            method: "POST",
            headers: getAuthHeaders(),
        }
    );
    const jsonResponse = await response.json();
    if (!jsonResponse.access_token) {
        throw new Error("Failed to get Zoom token");
    }
    return jsonResponse.access_token;
};

const createZoomMeeting = async (topic, startTime) => {
    const zoomAccessToken = await generateZoomAccessToken();
    const response = await fetch(`https://api.zoom.us/v2/users/me/meetings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${zoomAccessToken}`,
        },
        body: JSON.stringify({
            topic,
            type: 2,
            start_time: new Date(startTime).toISOString(),
            duration: 60,
            timezone: "Asia/Kolkata",
            settings: {
                host_video: true,
                participant_video: true,
            },
        }),
    });

    const jsonResponse = await response.json();
    if (!jsonResponse.id) {
        throw new Error("Zoom meeting creation failed");
    }
    return jsonResponse; // includes join_url, start_url, id, password
};

// ✅ API with Zoom Integration and DB Insert
app.post('/createMeeting', verifyToken, async (req, res) => {
    const { client_id, meeting_topic, start_time, number_of_people, phone, remarks } = req.body;

    try {
        // 1. Create Zoom Meeting
        const zoomMeeting = await createZoomMeeting(meeting_topic, start_time);

        // 2. Insert into DB (with Zoom links)
        const sql = `
            INSERT INTO client_meeting 
            (client_id, meeting_topic, start_time, number_of_people, phone, remarks, meeting_link, start_link) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(sql, [
            client_id,
            meeting_topic,
            start_time,
            number_of_people,
            phone,
            remarks,
            zoomMeeting.join_url,  // meeting_link
            zoomMeeting.start_url   // start_link
        ], (err, result) => {
            if (err) {
                console.error('Error in inserting meeting data:', err);
                return res.status(500).json({ error: 'An error occurred' });
            }
            // ✅ Respond with success + Zoom meeting details
            res.status(200).json({
                message: 'Meeting created successfully',
                zoom_meeting: {
                    meeting_id: zoomMeeting.id,
                    join_url: zoomMeeting.join_url,
                    start_url: zoomMeeting.start_url,
                    password: zoomMeeting.password
                }
            });
        });
    } catch (error) {
        console.error('Error creating meeting with Zoom:', error);
        res.status(500).json({ error: 'Failed to create Zoom meeting' });
    }
});





//get all client details 

app.get('/getAll', verifyToken, (req, res) => {
    const sql = 'select * from client_meeting';
    db.query(sql, (err, result) => {
        if (err) {
            console.log('Error in fetch Meeting details');
            res.status(500).json({ error: 'An error occure' })
        }
        else {
            res.status(200).json(result)
        }
    })
})

//search meeting for client

app.get('/searchMeeting', verifyToken, (req, res) => {
    const { client_id, meeting_id, meeting_topic, start_time, phone } = req.query;

    if (!client_id) {
        return res.status(400).json({ error: 'client_id is required' });
    }

    let sql = `SELECT * FROM client_meeting WHERE client_id = ?`;
    let params = [client_id];

    if (meeting_id) {
        sql += ` AND meeting_id = ?`;
        params.push(meeting_id);
    }

    if (meeting_topic) {
        sql += ` AND meeting_topic LIKE ?`;
        params.push(`%${meeting_topic}%`);
    }

    if (phone) {
        sql += ` AND phone LIKE ?`;
        params.push(`%${phone}%`);
    }

    if (start_time) {
        sql += ` AND DATE(start_time) = ?`;
        params.push(start_time);
    }

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('Error in search meeting:', err);
            return res.status(500).json({ error: 'An error occurred' });
        }
        res.status(200).json(result);
    });
});

//get all by id
app.get('/getAllById', verifyToken, (req, res) => {
    const { client_id } = req.query;

    if (!client_id) {
        return res.status(400).json({ error: 'client_id is required' });
    }

    const sql = 'SELECT * FROM client_meeting WHERE client_id = ?';

    db.query(sql, [client_id], (err, result) => {
        if (err) {
            console.error('Error fetching meetings by client_id:', err);
            return res.status(500).json({ error: 'An error occurred' });
        }

        res.status(200).json(result);
    });
});

//update profile

app.put('/updateProfile', verifyToken, (req, res) => {

    const { id, name, email, password, repeat_password } = req.body;
    const sql = 'update user_profile set name=? ,email=?,password=?,repeat_password=? where id=?';
    db.query(sql, [name, email, password, repeat_password, id], (err, result) => {
        if (err) {
            console.log('Error in fetch product');
            res.status(500).json({ error: 'An error occure' })
        }
        else {
            res.status(200).json({ message: 'Profile  updated successfuly' })
        }
    })
})


//Delete meeting
app.delete('/deleteMeetingBy/:id', verifyToken, (req, res) => {
    const id = req.params.id
    const sql = 'DELETE FROM client_meeting WHERE meeting_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error in deleting the product', err);
            res.status(500).json({ error: 'An error occured' })
        }
        else {
            res.status(200).json({ message: 'Product deleted successfully' });
        }
    })
})


