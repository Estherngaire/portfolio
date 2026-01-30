const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req, res) =>{
    res.render('home',{title:'Home'});
});
app.get('/about',(req, res) =>{
    res.render('about',{title:'About'});
});
app.get('/contact',(req, res) =>{
    res.render('contact',{title:'Contact'});
});
app.get('/portfolio',(req, res) =>{ 
    res.render('portfolio',{title:'Portfolio'});
});
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: ` "Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `New Contact Message from ${name}`,
        text: `
Name: ${name}
Email: ${email}

Message:
${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.render('contact', {
            title: 'Contact',
            success: 'Message sent successfully!'
        });
    } catch (error) {
        console.error(error);
        res.render('contact', {
            title: 'Contact',
            error: 'Something went wrong. Please try again.'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
