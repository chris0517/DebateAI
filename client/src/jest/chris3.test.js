import request from 'supertest';
import express from 'express';
import mysql from 'mysql';
import router from '../../../api/addAssignment'; // Update the path to your router file
import config from '../../../config'; // Update the path to your config file

jest.mock('mysql');

const app = express();
app.use(express.json());
app.use(router);

describe('/addAssignment endpoint', () => {
  it('should add an assignment to a classroom', async () => {
    const mockInsertResults = { affectedRows: 1 };

    const mockQuery = jest
      .fn()
      .mockImplementation((sql, data, callback) => callback(null, mockInsertResults));

    mysql.createConnection.mockReturnValue({
      query: mockQuery,
      end: jest.fn(),
    });

    const requestBody = {
      assignment: 'Assignment 1',
      classCode: 'Class1',
    };

    const response = await request(app).post('/addAssignment').send(requestBody);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ success: true });

    const expectedInsertSql = expect.stringContaining(
      'UPDATE Classroom SET Description = ? WHERE ClassroomID = ?',
    );
    expect(mockQuery).toHaveBeenCalledWith(
      expectedInsertSql,
      [requestBody.assignment, requestBody.classCode],
      expect.any(Function),
    );
  });
});
