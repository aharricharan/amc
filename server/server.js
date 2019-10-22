const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
nodemailer = require('nodemailer');

app.use(bodyParser.json());
app.use(cors({credentials: true, origin: true}))

const port = process.env.PORT || 1337;
const publicPath = path.resolve(__dirname, '');

app.post('/api/products', async function (req, res, next) {
	const transporter = nodemailer.createTransport({
	  service: 'hotmail',
	  auth: {
	    user: 'andycodechallenge@hotmail.com',
	    pass: 'challengeforfun1!'
	  }
	});

	var mailOptions = {
	  from: 'andycodechallenge@hotmail.com',
	  to: 'andylcoder2019@mailinator.com',
	  subject: 'Code Challenge Purchases',
	  text: JSON.stringify(req.body)
	};
	try {
		const response = await transporter.sendMail(mailOptions);
		res.send(response)
	} catch(err) {
		next(err);
	}
  	
})

app.listen(port, () => {
  console.log("Connected on " + port);
});