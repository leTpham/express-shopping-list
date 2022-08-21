const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb");

let popsicle = { name: "popsicle", price: 1.45 };

beforeEach(function() {
  items.items.push(popsicle);
});

afterEach(function() {
  items.items = [];
});
// end


/** GET /items - returns `{ items: [
  { name: "popsicle", price: 1.45 }
]}` */

describe("GET /items", function() {
  it("Gets a list of items", async function() {
    const resp = await request(app).get(`/items`);
    debugger;
    expect(resp.body).toEqual({ items: [popsicle] });
  });
});
// end

/** GET /items/[name] - return data about one item: `{name: "popsicle", "price": 1.45}` */

describe("GET /items/:name", function() {
  it("Gets a single item", async function() {
    const resp = await request(app).get(`/items/${popsicle.name}`);

    expect(resp.body).toEqual({name: "popsicle", "price": 1.45});
  });

  it("Responds with 404 if can't find item", async function() {
    const resp = await request(app).get(`/items/not-here`);
    expect(resp.statusCode).toEqual(404);
  });
});
// end

/** POST /items - create item from data; return `{added: {name: "cheerios", price: 3.40}}` */

describe("POST /items", function() {
  it("Creates a new item", async function() {
    const resp = await request(app)
      .post(`/items`)
      .send({
        name: "cheerios",
        price: 3.40
      });
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      added: { name: "cheerios", price: 3.40 }
    });
  });
});
// end

/** PATCH /items/[name] - update item; return `{updated: {name: "new popsicle", price: 2.45}}` */

describe("PATCH /items/:name", function() {
  it("Updates a single item", async function() {
    const resp = await request(app)
      .patch(`/items/${popsicle.name}`)
      .send({
        name: "new popsicle",
        price: 2.45
      });
    expect(resp.body).toEqual({
      updated: {name: "new popsicle", price: 2.45}
    });
  });

  it("Responds with 404 if name invalid", async function() {
    const resp = await request(app).patch(`/items/not-here`);
    expect(resp.statusCode).toEqual(404);
  });
});
// end

/** DELETE /items/[name] - delete item,
 *  return `{message: "Deleted"}` */

describe("DELETE /items/:name", function() {
  it("Deletes a single item", async function() {
    const resp = await request(app)
      .delete(`/items/${popsicle.name}`);
    expect(resp.body).toEqual({ message: "Deleted" });
    expect(items.items.length).toEqual(0);
  });
});
// end
