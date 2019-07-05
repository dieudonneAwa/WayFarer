import express from 'express';
import bodyParser from 'body-parser';
import Signup from '../auth/signup';
import Signin from '../auth/signin';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.get('/', (req, res) => res.send({ message: 'Welcome to my API' }));
app.post('/auth/signup', Signup.signUp);
app.post('/auth/signin', Signin.login);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}...`));

export default app;
