import request from 'supertest';
import express from 'express';
import mysql from 'mysql';
import router from '../../../api/studentList'; // Update the path to your router file
import config from '../../../config'; // Update the path to your config file

jest.mock('mysql');

const app = express();
app.use(express.json());
app.use(router);

describe('/studentList endpoint', () => {
  it('should retrieve a list of students for a given class code', async () => {
    const mockResults = [
      { id: 1, name: 'Student 1', classroomID: 200300, role: 'Student' },
      { id: 2, name: 'Student 2', classroomID: 200300, role: 'Student' },
    ];

    const mockQuery = jest
      .fn()
      .mockImplementation((sql, data, callback) => callback(null, mockResults));

    mysql.createConnection.mockReturnValue({
      query: mockQuery,
      end: jest.fn(),
    });

    const requestBody = {
      classCode: 200300,

    };

    const response = await request(app).post('/studentList').send(requestBody);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ express: JSON.stringify(mockResults) });

    const expectedSql = expect.stringContaining(
        'SELECT User.* FROM User INNER JOIN Classroom ON User.classroomID = Classroom.classroomID WHERE Classroom.classroomID = ? AND User.Role = \'Student\'',
        );
    expect(mockQuery).toHaveBeenCalledWith(
      expectedSql,
      [200300],
      expect.any(Function),
    );
  });
});
