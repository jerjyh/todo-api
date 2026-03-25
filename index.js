const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = [];
let nextId = 1;

// GET /todos — 取得所有待辦事項
app.get('/todos', (req, res) => {
  res.json(todos);
});

// POST /todos — 新增待辦事項
app.post('/todos', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'title 為必填欄位' });
  }
  const todo = { id: nextId++, title, completed: false };
  todos.push(todo);
  res.status(201).json(todo);
});

// PUT /todos/:id — 更新指定待辦事項
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: '找不到該待辦事項' });
  }
  const { title, completed } = req.body;
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;
  res.json(todo);
});

// DELETE /todos/:id — 刪除指定待辦事項
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: '找不到該待辦事項' });
  }
  todos.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Todo API 執行中：http://localhost:${PORT}`);
});
