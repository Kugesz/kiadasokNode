// Test file path: d:\Projektek\kiadasokNode\app.listen.test.js

const { listen } = require('../app');
const net = require('net');

// Mock the console.log function
const originalLog = console.log;
console.log = jest.fn();

afterAll(() => {
  // Restore the console.log function
  console.log = originalLog;
});

test('Should start the server successfully on a specific port', async () => {
  const PORT = 3000;
  const server = net.createServer();

  // Listen to the server
  server.listen(PORT);

  // Wait for the server to start listening
  await new Promise((resolve) => {
    server.on('listening', resolve);
  });

  // Close the server after the test
  server.close();

  // Call the listen function in the app
  listen(PORT);

  // Check if the console.log function was called with the expected message
  expect(console.log).toHaveBeenCalledWith(`server listens on port http://localhost:${PORT}`);
});it("should handle multiple simultaneous connections", async () => {
  const server = app.listen(PORT);
  const client1 = net.createConnection(PORT);
  const client2 = net.createConnection(PORT);

  await new Promise((resolve) => {
    client1.on("connect", () => {
      client2.on("connect", () => {
        resolve();
      });
    });
  });

  client1.end();
  client2.end();

  await new Promise((resolve) => {
    server.close(resolve);
  });
});