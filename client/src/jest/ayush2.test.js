import request from 'supertest';
import express from 'express';
import mysql from 'mysql';
import router from '../../../db/topics';
jest.mock('mysql');

const app = express();
app.use(express.json());
app.use(router);

describe('POST /addTopic', () => {
  it('should add a new topic', async () => {
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
      name: 'New Topic',
    };

    const response = await request(app).post('/addTopic').send(requestBody);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({success: true});

    expect(mockQuery).toHaveBeenCalledWith(
      'INSERT INTO Topics (Name) VALUES (?)',
      [requestBody.name],
      expect.any(Function),
    );
  });
});
