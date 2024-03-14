import request from 'supertest';
import express from 'express';
import mysql from 'mysql';
import router from '../../../db/student.js'; // Update the path to the student route handle

jest.mock('mysql');

const app = express();
app.use(express.json());
app.use(router);

describe('POST /getStudent', () => {
  it('should fetch student details for the given email', async () => {
    // Mock student data to be returned by the query
    const mockStudentData = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        course: 'Computer Science',
      },
    ];

    // Mock the implementation of the mysql query function
    const mockQuery = jest.fn().mockImplementation(
      (sql, data, callback) => callback(null, mockStudentData), // Simulating a successful query response
    );

    mysql.createConnection.mockReturnValue({
      query: mockQuery,
      end: jest.fn(),
    });

    const requestBody = {
      email: 'john.doe@example.com',
    };

    const response = await request(app).post('/getStudent').send(requestBody);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({express: JSON.stringify(mockStudentData)});

    expect(mockQuery).toHaveBeenCalledWith(
      'SELECT * From Student Where Email = ?',
      [requestBody.email],
      expect.any(Function),
    );
  });

  // You can add more tests here to cover different input scenarios and error handling
});
