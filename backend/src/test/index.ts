import request from 'supertest';
import app from '../server';

describe('GET /api/transactions', () => {
  it('Debe retornar un array de transacciones', async () => {
    const res = await request(app).get('/api/transactions');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});