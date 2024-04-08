import request from 'supertest';
import express from 'express';
import mysql from 'mysql';
import router from '../../../api/login.js';
import config from '../../../config.js'; // Update the path to your config file

jest.mock('mysql');

const app = express();
app.use(express.json());
app.use(router);

describe('/login endpoint', () => {
  it('should retrieve a user with a given email', async () => {
    const mockResults = [
      { id: 1, name: 'Jane Doe', email: 'jane.doe@example.com', role: 'student' },
    ];

    const mockQuery = jest
      .fn()
      .mockImplementation((sql, data, callback) => callback(null, mockResults));

    mysql.createConnection.mockReturnValue({
      query: mockQuery,
      end: jest.fn(),
    });

    const requestBody = {
      email: 'jane.doe@example.com',
      role: 'student',
    };

    const response = await request(app).post('/login').send(requestBody);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ express: JSON.stringify(mockResults) });

    const expectedSql = expect.stringContaining('SELECT * From User Where Email = ?');
    expect(mockQuery).toHaveBeenCalledWith(
      expectedSql,
      [requestBody.email],
      expect.any(Function),
    );
  });
});
