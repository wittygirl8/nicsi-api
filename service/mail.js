var nodemailer = require('nodemailer');
var path = require('path');
const hbs = require('nodemailer-express-handlebars')
const viewPath =  path.resolve(__dirname, '../templates/views/');
const partialsPath = path.resolve(__dirname, '../templates/partials');

const sendMail = (emailDetails) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mpr@aeologic.com',
            pass: 'Welcome@2021'
        }
    });
    
    transporter.use('compile', hbs({
        viewEngine: {
          extName: '.handlebars',
          // partialsDir: viewPath,
          layoutsDir: viewPath,
          defaultLayout: false,
        //   data: emailDetails.data,/
          partialsDir: partialsPath,
        },
        viewPath: viewPath,
        extName: '.handlebars',
    }))

    emailDetails.emailList.map((data) => {
        var mailOptions = {
            from: 'mpr@aeologic.com',
            to: data,
            subject: 'Sending Email using Node.js',
            template: 'index'
        };
    
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    })

    
}

module.exports = sendMail;