# Todo List REST API

使用 Node.js 和 Express 建立的 Todo List REST API，資料儲存於記憶體中。

## 安裝

```bash
npm install
```

## 啟動

```bash
node index.js
```

伺服器預設運行於 `http://localhost:3000`

---

## API 端點

### GET /todos
取得所有待辦事項

```bash
curl http://localhost:3000/todos
```

回應：
```json
[
  { "id": 1, "title": "Buy milk", "completed": false }
]
```

---

### POST /todos
新增待辦事項

```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy milk"}'
```

回應 `201 Created`：
```json
{ "id": 1, "title": "Buy milk", "completed": false }
```

---

### PUT /todos/:id
更新指定待辦事項

```bash
curl -X PUT http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy milk and eggs", "completed": true}'
```

回應：
```json
{ "id": 1, "title": "Buy milk and eggs", "completed": true }
```

---

### DELETE /todos/:id
刪除指定待辦事項

```bash
curl -X DELETE http://localhost:3000/todos/1
```

回應 `204 No Content`

---

## 資料結構

| 欄位        | 型別    | 說明             |
|-------------|---------|------------------|
| `id`        | number  | 自動遞增的唯一識別碼 |
| `title`     | string  | 待辦事項標題（必填）|
| `completed` | boolean | 是否完成，預設 `false` |

## 技術棧

- [Node.js](https://nodejs.org) v24+
- [Express](https://expressjs.com) v5
