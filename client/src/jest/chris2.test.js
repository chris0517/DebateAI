import request from 'supertest';
import express from 'express';
import mysql from 'mysql';
import router from '../../../api/login.js';

jest.mock('mysql');

const app = express();
app.use(express.json());
app.use(router);

describe('/retrieveUser endpoint', () => {
  it('should retrieve a user with a given email and role', async () => {
    const mockResults = [
      {id: 1, name: 'Jane Doe', email: 'jane.doe@example.com', role: 'student'},
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

    const response = await request(app).post('/retrieveUser').send(requestBody);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({express: JSON.stringify(mockResults)});

    const expectedSql = expect.stringContaining(
      'SELECT * From Student Where Email = ?',
    );
    expect(mockQuery).toHaveBeenCalledWith(
      expectedSql,
      expect.any(Array),
      expect.any(Function),
    );
  });
});
