const express = require('express');
require('dotenv').config();
const sequelize = require('./db');
const models = require('./models/models')
const cors = require('cors');
const fUpload = require('express-fileupload');
const router = require('./routes/mainRouter');
const PORT = process.env.PORT;
const errHandler = require('./middleware/errHandlingMidleware');
const path = require('path');

const app = express();
app.use(cors());
app.use(fUpload({}));
app.use(express.json());
app.use('/api', router);
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(errHandler);


app.get('/', (req, res) => {
    res.status(200).json({text: 'Server is working'})
})

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`[Server working...  port:${PORT}]`));
    } catch(e) {
        console.log(e);
    }
}

start();


