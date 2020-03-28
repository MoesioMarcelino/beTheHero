const request = require("supertest");
const app = require("../../src/app");
const database = require("../../src/database");

describe('ONG', () => {
  beforeEach(async () => {
    await database.migrate.rollback();
    await database.migrate.latest();
  });

  afterAll(async () => {
    await database.destroy();
  })

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "APAD",
        email: "apad@apad.com",
        whatsapp: "+5588997129443",
        city: "Juazeiro do Norte",
        uf: "CE"
      });

      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toHaveLength(8);

  })
})