const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const Nexmo = require("nexmo");
const socketio = require("socket.io");
const dotenv = require("dotenv").config();

const app = express();

//Template engine setup
app.set("view engine", "html");
app.engine("html", ejs.renderFile);

//Public folder setup
app.use(express.static(__dirname + '/client'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//initialise Nexmo
const nexmo = new Nexmo({
    apiKey: `${process.env.API_KEY}`,
    apiSecret: `${process.env.API_SECRET}`
}, { debug: true });

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("TEST");
});

//Catch form submit
app.post("/", (req, res) => {
    const number = req.body.number;
    const text = req.body.text;

    nexmo.message.sendSms(
        `${process.env.MY_NUMBER}`, number, text, { type: "unicode" }, 
        (err, responseData) => {
            if(err)
            {
                console.log(err);
            }
            else
            {
                console.dir(responseData);
            }
        }
    )
});

//Start server
const server = app.listen(port, () => console.log(`Server started on port ${port}`));
//to try - vonage api instead of nexmo api and axios instead of fetch api
//for this refer to - 
// https://github.com/Vonage/vonage-node-code-snippets/blob/2bb4a33/messages/sms/send-sms.js#L21-L25
// https://developer.vonage.com/en/messaging/sms/code-snippets/send-an-sms?lang=javascript
// https://api.support.vonage.com/hc/en-us/articles/204014853-How-do-I-add-test-numbers-during-my-Vonage-API-trial#article-comments

