const express = require('express');
const app = express();
//const PORT = 4000;

const { typeError } = require('./middleware/errors');
const { dbConnection } = require('./config/config');

require('dotenv').config();

const PORT = process.env.PORT || 4001;

app.use(express.json());

dbConnection();

app.use('/posts', require('./routes/posts'));
app.use('/users', require('./routes/users'));
app.use('/comments', require('./routes/comments'));

app.use(typeError);

app.listen(PORT, console.log(`Server started on port ${PORT}`));
