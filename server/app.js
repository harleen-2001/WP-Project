const express = require('express')
const {MongoClient} = require('mongodb')
const nodemailer = require('nodemailer')

const uri = "mongodb+srv://admin:admin@cluster0.lz1fv.mongodb.net/thesocialclub?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    if(err) console.log(err)
    else console.log("MongoDB is connected")
})

const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    secureConnection: false,
    tls: {
        rejectUnauthorized: false,
    },
    auth: {
        user: "kundiharleen@gmail.com",
        pass: "hr26aj5757"
    }
})

const app = express()

app.use([express.static('./public'), express.json(), express.urlencoded()])

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/public/index.html")
})

app.post('/', async (req, res) => {
    const document = req.body;

    const mail = {
        form: 'kundiharleen@gmail.com',
        to: document.email,
        subject: "The Social Club - Thank You",
        text: "Thank you for visiting our site, we will get back to you as soon as possible"
    }

    const response = await client.db('thesocialclub').collection('queries').insertOne(document);

    mailTransporter.sendMail(mail, (err, info) => {
        res.json({message: "SUCCESS"});
    })


    
})

app.listen(4000, () => {
    console.log("server is up")
})