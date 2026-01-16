import cors from 'cors';
import express from 'express';
import { pool } from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
});


// Endpoint para crear un nuevo usuario
app.post('/api/users', async (req, res) => {
  const { id, name, email, github, status } = req.body;
  console.log(req.body);
  try {
    
    const result = await pool.query(
      'INSERT INTO users (id, name, email, github, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id, name, email, github, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear usuario: '+error.message });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, github, status } = req.body;
  try {
    
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2, github = $3, status = $4 WHERE id = $5 RETURNING *',
      [name, email, github, status, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
