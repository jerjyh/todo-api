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
