//********************************************************************************* */
//      Connect to MONGODB, Configure MONGOOSE and setup SERVER with EXPRESS
//********************************************************************************* */
 
require('./models/User');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');

const requireAuths  = require('./middlewares/requireAuths');

app.use(bodyParser.json());
app.use(authRoutes);


//******* */Configure Mongoose to MongoDB ***********
const mongoUri = "mongodb+srv://dbAdmin:6Oq!Q*2P9PKnIw@travelapp-x7nry.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MONGO-YO!')
});
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo', err)
});




app.get('/', requireAuths, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});


app.listen(3000, () => console.log('Gator app listening on port 3000!'));
