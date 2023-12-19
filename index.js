// Convert the ExpressJS
const express = require('express');


// Define the Read/write files
const fs = require('fs');


// Create the ExpressJS Application

const app = express();


// middleware
app.use(express.json());


// Define the application hostname & port number
const HOSTNAME = '127.0.0.1';  // local host IP Address
const PORT     = 4000;         // user defined


// Middleware to parse JSON in the request body
app.use(express.json());


// GET Methods
// set the end ponits
// set the / route
// try & catch methods
app.get('/', (req, res) => {
    try {
        let datetime = new Date().toISOString();
        fs.writeFile(`current date-time.txt`, datetime, (err) => {
            if (err)
                throw err;
            else {
                fs.readFile(`current date-time.txt`, (err, data) => {
                    if (err)
                        throw err;
                    else
                        res.status(200).send({ message: "Successfully The Current Date & Time Displayed", datetime });
                });
            }
        });
    } catch (error) {
        console.log("Internal Server Error");
        res.status(404).send(error);
    }
});



// POST
// endpoint to create a new note based on the request data
app.post('/post-file', (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).send({ message: "Put The Input Inside The Body Tag" });
        }

        let datetime = new Date().toISOString();
        const fileName = `current date-time_post.txt`;

        fs.writeFile(fileName, content, (err) => {
            if (err) {
                throw err;
            } else {
                res.status(200).send({ message: "Successfully The File Is Post", fileName, datetime });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
});


// Make the server to listen to the different port number
app.listen(PORT, () => {
    console.log(`Application Running at http://${HOSTNAME}:${PORT}`);
})