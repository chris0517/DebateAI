import request from 'supertest';
import express from 'express';
import mysql from 'mysql';
import router from '../../../api/assignmentStatus'; // Update the path to your router file
import config from '../../../config'; // Update the path to your config file

jest.mock('mysql');

const app = express();
app.use(express.json());
app.use(router);

describe('/updateAssignment endpoint', () => {
  it('should update the assignment status for a user', async () => {
    const mockInsertResults = { affectedRows: 1 };

    const mockQuery = jest
      .fn()
      .mockImplementation((sql, data, callback) => callback(null, mockInsertResults));

    mysql.createConnection.mockReturnValue({
      query: mockQuery,
      end: jest.fn(),
    });

    const requestBody = {
      assignmentStatus: 'Completed',
      email: 'user@example.com',
    };

    const response = await request(app).post('/updateAssignment').send(requestBody);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ success: true });

    const expectedInsertSql = expect.stringContaining(
      'UPDATE User SET Assignment = ? WHERE Email = ?',
    );
    expect(mockQuery).toHaveBeenCalledWith(
      expectedInsertSql,
      [requestBody.assignmentStatus, requestBody.email],
      expect.any(Function),
    );
  });
});
