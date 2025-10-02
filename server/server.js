const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secreto';
const app = express();
const { expressjwt: jwtMiddleware } = require('express-jwt');
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

app.post('/verify-token', jwtMiddleware({ secret: JWT_SECRET, algorithms: ['HS256'] }), (req, res) => {
  res.json({ valid: true });
});

app.get('/keyboards', (req, res) => {
  const keyboards = [
    {
      name: "Mechanical Pro X",
      price: "$129",
      image: "https://images.pexels.com/photos/5393415/pexels-photo-5393415.jpeg",
    },
    {
      name: "RGB Gamer",
      price: "$99",
      image: "https://images.pexels.com/photos/15774453/pexels-photo-15774453.jpeg",
    },
    {
      name: "Minimalist Wireless",
      price: "$89",
      image: "https://images.pexels.com/photos/532173/pexels-photo-532173.jpeg",
    },
    {
      name: "Compact Pro",
      price: "$119",
      image: "https://images.pexels.com/photos/722675/pexels-photo-722675.jpeg",
    },
    {
      name: "Ergo Split",
      price: "$149",
      image: "https://images.pexels.com/photos/4065710/pexels-photo-4065710.jpeg",
    },
    {
      name: "Silent Touch",
      price: "$79",
      image: "https://images.pexels.com/photos/8875612/pexels-photo-8875612.jpeg",
    },
    {
      name: "Gaming Beast",
      price: "$199",
      image: "https://images.pexels.com/photos/4065748/pexels-photo-4065748.jpeg",
    },
    {
      name: "Ultra Thin",
      price: "$69",
      image: "https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Classic Retro",
      price: "$109",
      image: "https://images.pexels.com/photos/32664038/pexels-photo-32664038.jpeg",
    },
  ];
  res.json(keyboards);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
