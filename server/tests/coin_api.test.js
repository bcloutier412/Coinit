const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("coins are returned as json", async () => {
    await api
        .get("/api/user/watchlist")
        .expect(200)
        .expect("Content-Type", /application\/json/);
});

afterAll(async () => {
    await mongoose.connection.close();
});
