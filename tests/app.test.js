const request = require('supertest');
const { createApp } = require('../src/app');

describe('DevFlow Application', () => {
  let app;

  beforeAll(() => {
    process.env.NODE_ENV = 'test';
    process.env.APP_VERSION = '1.2.3';
    app = createApp();
  });

  test('GET / returns the home page HTML', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('text/html');
    expect(response.text).toContain('IBM Q2D - DevOps CI/CD Pipeline');
    expect(response.text).toContain('IBM Q2D DevOps Demo');
  });

  test('GET /api/health returns healthy JSON', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'healthy',
      environment: 'test',
      version: '1.2.3'
    });
  });

  test('GET /api/info returns application details', async () => {
    const response = await request(app).get('/api/info');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      application: 'IBM Q2D DevOps Demo',
      version: '1.2.3',
      environment: 'test'
    });
  });
});
