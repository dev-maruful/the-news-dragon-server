const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());

const categories = require("./data/categories.json");
const news = require("./data/news.json");

app.get("/", (req, res) => {
  res.send("Dragon is running!");
});

app.get("/categories", (req, res) => {
  res.send(categories);
});

app.get("/news", (req, res) => {
  res.send(news);
});

app.get("/news/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const selectedNews = news.find((n) => n._id === id);
  res.send(selectedNews);
});

app.get("/categories/:id", (req, res) => {
  const categoryId = parseInt(req.params.id);
  if (categoryId === 0) {
    res.send(news);
  } else {
    const selectedCategory = news.filter(
      (nc) => parseInt(nc.category_id) === categoryId
    );
    res.send(selectedCategory);
  }
});

app.listen(port, () => {
  console.log(`Dragon API is running on port ${port}`);
});
