import request from 'supertest';
import express from 'express';
import mysql from 'mysql';
import router from '../../../api/signup.js';
jest.mock('mysql');

const app = express();
app.use(express.json());
app.use(router);

describe('/addUser endpoint', () => {
  it('should insert a new student into the database', async () => {
    const mockQuery = jest
      .fn()
      .mockImplementation((sql, data, callback) =>
        callback(null, {affectedRows: 1}),
      );
    mysql.createConnection.mockReturnValue({
      query: mockQuery,
      end: jest.fn(),
    });

    const requestBody = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      studentNum: 'S12345678',
      role: 'student',
    };

    const response = await request(app).post('/addUser').send(requestBody);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      express: JSON.stringify({ affectedRows: 1 }),
    });
    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO User'),
      expect.any(Array),
      expect.any(Function),
    );
  });
});
