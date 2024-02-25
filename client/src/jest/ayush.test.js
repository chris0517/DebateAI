import request from 'supertest';
import express from 'express';
import mysql from 'mysql';
import router from '../../../db/topics.js';
jest.mock('mysql');

const app = express();
app.use(express.json());
app.use(router);
describe('POST /getTopics', () => {
  it('should fetch all topics', async () => {
    const mockQuery = jest.fn().mockImplementation((sql, callback) =>
      callback(null, [
        {id: 1, name: 'Topic 1'},
        {id: 2, name: 'Topic 2'},
      ]),
    );
    mysql.createConnection.mockReturnValue({
      query: mockQuery,
      end: jest.fn(),
    });

    const response = await request(app).post('/getTopics').send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      express: JSON.stringify([
        {id: 1, name: 'Topic 1'},
        {id: 2, name: 'Topic 2'},
      ]),
    });
    expect(mockQuery).toHaveBeenCalledWith(
      'SELECT * FROM Topics',
      expect.any(Function),
    );
  });
});
