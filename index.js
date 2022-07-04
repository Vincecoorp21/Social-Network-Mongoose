const express = require('express');
const app = express();
//const PORT = 4000;
require('dotenv').config();
const PORT = process.env.PORT || 4001;
const { typeError } = require('./middleware/errors');
const { dbConnection } = require('./config/config');

const swaggerUI = require('swagger-ui-express');
const docs = require('./docs/index');

const cors = require('cors');

app.use(express.json());

app.use(cors());

dbConnection();

app.use('/posts', require('./routes/posts'));
app.use('/users', require('./routes/users'));
app.use('/comments', require('./routes/comments'));

app.use(typeError);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));

app.listen(PORT, console.log(`Server started on port ${PORT}`));
