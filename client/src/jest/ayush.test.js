// Import necessary libraries
const request = require('supertest');
const express = require('express');
const mysql = require('mysql');

// Mock the mysql module

let config = {
  host: 'ec2-3-137-65-169.us-east-2.compute.amazonaws.com',
  user: 'a25bharg',
  password: 'MSCI342',
  database: 'a25bharg',
};

const app = express();
app.use(express.json());
jest.mock('mysql');

app.post('/getTopics', (req, res) => {
  let connection = mysql.createConnection(config);

  const sql = `SELECT * FROM Topics`;

  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.log('error: ', error);
      return console.error(error.message);
    }
    let string = JSON.stringify(results);
    res.send({express: string});
  });
  connection.end();
});

const mockTopics = [
  {id: 1, name: 'Topic 1'},
  {id: 2, name: 'Topic 2'},
];

describe('POST /getTopics', () => {
  it('should fetch all topics', async () => {
    mysql.createConnection.mockReturnValue({
      query: jest
        .fn()
        .mockImplementation((sql, callback) => callback(null, mockTopics)),
      end: jest.fn(),
    });

    const response = await request(app).post('/getTopics').send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({express: JSON.stringify(mockTopics)});
  });
});
