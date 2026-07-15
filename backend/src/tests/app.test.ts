import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../app';

describe('App endpoints', () => {
  it('should return 200 and success message on GET /', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      message: 'ANWESHAN Backend Running'
    });
  });
});
