const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = Number(new Date());
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.find(note => note.id === id);

  if (isSuccess) {
    return h
      .response({
        status: 'success',
        message: 'Note added!',
        data: {
          noteId: id,
        },
      })
      .code(201);
  }

  return h
    .response({
      status: 'fail',
      message: 'Fail to add note',
    })
    .code(500);
};

module.exports = { addNoteHandler };
