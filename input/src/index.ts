import express, { Request, Response } from 'express';
import pool from './db';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Service A!');
});

app.post('/string', async (req: Request, res: Response): Promise<void> => {
    const { text } = req.body;
    
    if (typeof text !== 'string') {
      res.status(400).json({ error: 'Please provide a valid string in the "text" field.' });
      return;
    }
    
    try {
      const result = await pool.query(
        'INSERT INTO strings (text) VALUES ($1) RETURNING *',
        [text]
      );
      
      res.status(201).json({
        message: 'String inserted successfully',
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Error inserting string:', error);
      res.status(500).json({ error: 'Failed to insert string' });
    }
  });

app.listen(port, () => {
  console.log(`Service A is running on port ${port}`);
});
