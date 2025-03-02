import express, { Request, Response } from 'express';
import pool from './db';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Service B!');
});

app.get('/string', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM strings');
    
    res.status(200).json({
      message: 'Strings retrieved successfully',
      data: result.rows  // returns all rows from the table
    });
  } catch (error) {
    console.error('Error retrieving strings:', error);
    res.status(500).json({ error: 'Failed to retrieve db content' });
  }
});

app.delete('/string', async (req, res) => {
  try {
    await pool.query('DELETE FROM strings');
    res.status(200).json({ message: 'All strings deleted successfully' });
  } catch (error) {
    console.error('Error deleting strings:', error);
    res.status(500).json({ error: 'Failed to delete strings' });
  }
});


app.listen(port, () => {
  console.log(`Service A is running on port ${port}`);
});
