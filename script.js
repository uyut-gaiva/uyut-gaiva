var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
var nodemailer = require('nodemailer');

// Функция добавления текста в начало файла
var addToFile = function (filename, feedback) {
  fs.readFile(filename, 'utf8', function (err, data) {
    fs.writeFile(filename, feedback + '\n\n' + data, function (err, data) {});
  });
  console.log('\t__Message_saved__\n');
};

app.set('veiw engine', 'ejs');

app.use('/public', express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html'); // Главная
});
app.get('/index', function (req, res) {
  res.sendFile(__dirname + '/index.html'); // Главная (альтернатива)
});
app.get('/feedback', function (req, res) {
  res.sendFile(__dirname + '/feedback.html'); // Отзывы
});
app.get('/request', function (req, res) {
  res.sendFile(__dirname + '/request.html'); // Сообщение об ошибке
});
app.get('/feedback_complete', function (req, res) {
  res.sendFile(__dirname + '/feedback_complete.html'); // Страница завершения обратной связи
  console.log('\t__New_message__\n');

  // Преобразование JSON в список удобный для чтения
  var feedbackItem = JSON.parse(JSON.stringify(req.query));
  var d = new Date();
  var feedback = "Дата: " + d + "\nИмя: " + feedbackItem.name + "\nПочта: " + feedbackItem.email + "\nОтзыв: " + feedbackItem.reqbody;
  var feedbackhtml = '<b>' + "Дата: " + d + "<br>Имя: " + feedbackItem.name + "<br>Почта: " + feedbackItem.email + "<br>Отзыв: " + feedbackItem.reqbody + '</b>'

  //Запись сообщения в файл
  addToFile("user_feedback.txt", feedback);

  'use strict';
  // Автомаическая отправка соощения на почту
  console.log('\t__Sending_message...\n');
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'jkhvm36em644yz4f@ethereal.email',
        pass: 'Vx2FK3mnUEb7UmQ5DW'
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '<jkhvm36em644yz4f@ethereal.email>', // sender address
      to: 'get-uyut-gaiva@yandex.ru', // list of receivers
      subject: 'New feedback', // Subject line
      text: feedback, // plain text body
      html: feedbackhtml // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('\tMessage sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('\tPreview URL: %s', nodemailer.getTestMessageUrl(info));
      console.log('\n\t__Feedback_completed__\n');
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  });
});
app.get('/request_complete', function (req, res) {
  res.sendFile(__dirname + '/request_complete.html'); // Страница завершения обратной связи
  console.log('\t__New_message__\n');

  // Преобразование JSON в список удобный для чтения
  var feedbackItem = JSON.parse(JSON.stringify(req.query));
  var d = new Date();
  var feedback = "Дата: " + d + "\nИмя: " + feedbackItem.name + "\nПочта: " + feedbackItem.email + "\nОтзыв: " + feedbackItem.reqbody;
  var feedbackhtml = '<b>' + "Дата: " + d + "<br>Имя: " + feedbackItem.name + "<br>Почта: " + feedbackItem.email + "<br>Отзыв: " + feedbackItem.reqbody + '</b>'

  //Запись сообщения в файл
  addToFile("bug_reports.txt", feedback);

  'use strict';
  // Автомаическая отправка соощения на почту
  console.log('\t__Sending_message...\n');
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'jkhvm36em644yz4f@ethereal.email',
        pass: 'Vx2FK3mnUEb7UmQ5DW'
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '<jkhvm36em644yz4f@ethereal.email>', // sender address
      to: 'get-uyut-gaiva@yandex.ru', // list of receivers
      subject: 'New feedback', // Subject line
      text: feedback, // plain text body
      html: feedbackhtml // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('\tMessage sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('\tPreview URL: %s', nodemailer.getTestMessageUrl(info));
      console.log('\n\t__Request_completed__\n');
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  });
});
app.get('/index#akzia', function (req, res) {
  res.sendFile(__dirname + '/index.html#akzia'); // Раздел акций на главной
});
// Работаем с портом 3000
app.listen(3000);
console.log('__Server_started_at_3000__\n\n')
