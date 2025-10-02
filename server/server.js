const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secreto';
const app = express();
const port = 3000;

app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const users = [
  { username: 'admin', password: 'admin123' },
  { username: 'user', password: 'user123' }
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
  }
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  return res.json({ token });
});

app.get('/keyboards', (req, res) => {
  const keyboards = [
    {
      name: "Mechanical Pro X",
      price: "$129",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "RGB Gamer",
      price: "$99",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Minimalist Wireless",
      price: "$89",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    },
  ];
  res.json(keyboards);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});