// /**
//  * @jest-environment node
//  */
// import request from 'supertest';
// import express from 'express';
// import next from 'next';
// import { parse } from 'url';
// import InMemoryDBRunner from '@/modules/mongoose/InMemoryDBRunner';
//
// /* eslint-disable no-console */
// let app, server, handle;
//
// describe('Express + Next.js server', () => {
//   const inMemoryDBRunner = new InMemoryDBRunner();
//
//   beforeAll(async () => {
//     await inMemoryDBRunner.connectToInMemoryDBAndLoadTestData();
//
//     const dev = true;
//     app = next({ dev, dir: process.cwd() }); // 👈 важно!
//     handle = app.getRequestHandler();
//     await app.prepare();
//
//     server = express();
//     server.all('*', (req, res) => {
//       return handle(req, res);
//     });
//
//     server.use((req, res) => {
//       const parsedUrl = parse(req.url, true); // только pathname + query
//       // eslint-disable-next-line no-console
//       console.log('Parsed URL:', parsedUrl);
//       return handle(req, res, parsedUrl);
//     });
//
//     await server.listen();
//   });
//
//   it('should return API response', async () => {
//     const res = await request(server).get('/api/schedule/nearest');
//     console.log('BODY:', res.body); // 👈 посмотреть, что реально возвращает
//     expect(res.status).toBe(200);
//   }, 40000);
// });
