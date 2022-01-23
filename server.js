const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors');
const path = require('path')

const app = express()

//CONNECT DATABASE
connectDB();

//INIT MIDDLEWARE
app.use(express.json({ extended: false }))
app.use(cors({
    origin: ["http://localhost:3000","https://arcane-anchorage-30894.herokuapp.com"],
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

//DEFINE ROUTES
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));