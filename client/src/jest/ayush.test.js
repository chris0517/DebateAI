// Import necessary libraries using ES Module syntax
import request from 'supertest';
import express from 'express';
import mysql from 'mysql';
import router from '../../../db/topics.js'; // Import the router that includes the endpoint you're testing
// Mock the mysql module
jest.mock('mysql');

const app = express();
app.use(express.json());
app.use(router); // Use the router that includes the endpoint you're testing

describe('POST /getTopics', () => {
  it('should fetch all topics', async () => {
    // Mock MySQL connection and query method
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

    // Perform the request to the endpoint
    const response = await request(app).post('/getTopics').send();

    // Assert the response
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      express: JSON.stringify([
        {id: 1, name: 'Topic 1'},
        {id: 2, name: 'Topic 2'},
      ]),
    });
    // Ensure the query was called with the correct SQL statement
    expect(mockQuery).toHaveBeenCalledWith(
      'SELECT * FROM Topics',
      expect.any(Function), // Since SQL query does not use data array, we expect a callback function here
    );
  });

  // Additional tests can follow...
});
