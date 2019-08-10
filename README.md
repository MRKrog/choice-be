# Choice API
This is a REST API with the full CRUD for making notes with a title, copy, and status.

## Make Requests
- Use GET, POST, PATCH, DELETE requests below to view, add, update, or delete to the API. Endpoint outlined details and how to use are below.

## View Application:
[https://choice-api.herokuapp.com/](https://choice-api.herokuapp.com/)

## Endpoints  

#### GET `/api/v1/orders` (All Orders)
The response sends all the orders in the database.


| Name         | type      | Description                                     |
| :------------|:----------|:------------------------------------------------|
| id           | integer   | unique id for each order                        |
| number       | integer   | number of the order                             |

```json
[
  {
      "id": 1,
      "number": "1111",
  },
  {
      "id": 2,
      "name": "2222",
  }

]
```

#### GET `/api/v1/notes` (All Notes)
The response sends all the notes in the database.

| Name         | type      | Description                                     |
| :------------|:----------|:------------------------------------------------|
| id           | integer   | unique id for each note                         |
| title       | string   | title of the note                                 |
| copy       | string   | copy of the note                                   |
| status       | integer   | status number of the note                       |
| order_id       | integer   | relation of note to order                     |

```json
[
  {
    "id": 9,
    "title": "Example Title",
    "copy": "Example Copy",
    "status": 0,
    "order_id": 1,
  },
  {
    "id": 8,
    "title": "Example Title",
    "copy": "Example Copy",
    "status": 0,
    "order_id": 2,
  }
]
```

#### POST `/api/v1/notes` (Create New Note)
A user can create/post a new note to the database.


#### DELETE `/api/v1/notes/:id`
A user can also delete a specific note


#### PUT `/api/v1/projects/:id` (Update Note Title, Copy, or Status)
A user can update an existing note.
