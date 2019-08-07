const seedData = require('../../data/seedData.js');

const createOrders = (knex, order) => {
  return knex('orders').insert({
    number: order.number,
  }, 'id')
  .then(order_id => {
    let notePromises = [];

    order.notes.forEach(note => {
      notePromises.push(
        createNotes(knex, {
          title: note.title,
          copy: note.copy,
          status: note.status,
          order_id: order_id[0]
        })
      )
    });


    return Promise.all(notePromises);
  })
};

const createNotes = (knex, note) => {
  return knex('notes').insert(note)
};


exports.seed = (knex, Promise) => {
  return knex('notes').del()
    .then(() => knex('orders').del())
    .then(() => {

      let orderPromises = [];
      seedData.forEach(order => {
        orderPromises.push(createOrders(knex, order));
      });

      return Promise.all(orderPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
