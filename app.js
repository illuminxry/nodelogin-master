const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const loginRoutes = require('./routes/login')
const registerRoutes = require('./routes/register')
const homeRoutes = require('./routes/home')

app.use('/', loginRoutes);
app.use('/',registerRoutes);
app.use('/',homeRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
