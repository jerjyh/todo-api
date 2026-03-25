const { test, describe, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

// 每次測試前重置 todos 狀態
let app;
beforeEach(() => {
  // 清除 require cache 以重置記憶體資料
  delete require.cache[require.resolve('./index')];
  app = require('./index');
});

describe('GET /todos', () => {
  test('初始應回傳空陣列', async () => {
    const res = await request(app).get('/todos');

    assert.equal(res.status, 200);
    assert.deepEqual(res.body, []);
  });

  test('新增後應回傳所有待辦事項', async () => {
    await request(app).post('/todos').send({ title: '買牛奶' });
    await request(app).post('/todos').send({ title: '寫作業' });

    const res = await request(app).get('/todos');

    assert.equal(res.status, 200);
    assert.equal(res.body.length, 2);
    assert.equal(res.body[0].title, '買牛奶');
    assert.equal(res.body[1].title, '寫作業');
  });
});

describe('POST /todos', () => {
  test('新增待辦事項應回傳 201 及新資料', async () => {
    const res = await request(app)
      .post('/todos')
      .send({ title: '買牛奶' });

    assert.equal(res.status, 201);
    assert.equal(res.body.title, '買牛奶');
    assert.equal(res.body.completed, false);
    assert.ok(res.body.id);
  });

  test('缺少 title 應回傳 400', async () => {
    const res = await request(app)
      .post('/todos')
      .send({});

    assert.equal(res.status, 400);
    assert.equal(res.body.error, 'title 為必填欄位');
  });
});

describe('PUT /todos/:id 錯誤測試', () => {
  test('更新不存在的 id 應回傳 404', async () => {
    const res = await request(app)
      .put('/todos/999')
      .send({ title: '不存在的項目' });

    assert.equal(res.status, 404);
    assert.equal(res.body.error, '找不到該待辦事項');
  });

  test('更新 id 為非數字應回傳 404', async () => {
    const res = await request(app)
      .put('/todos/abc')
      .send({ title: '測試' });

    assert.equal(res.status, 404);
    assert.equal(res.body.error, '找不到該待辦事項');
  });
});

describe('DELETE /todos/:id 錯誤測試', () => {
  test('刪除不存在的 id 應回傳 404', async () => {
    const res = await request(app)
      .delete('/todos/999');

    assert.equal(res.status, 404);
    assert.equal(res.body.error, '找不到該待辦事項');
  });

  test('刪除 id 為非數字應回傳 404', async () => {
    const res = await request(app)
      .delete('/todos/abc');

    assert.equal(res.status, 404);
    assert.equal(res.body.error, '找不到該待辦事項');
  });
});
