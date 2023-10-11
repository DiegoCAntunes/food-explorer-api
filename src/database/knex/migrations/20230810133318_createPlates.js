exports.up = knex => knex.schema.createTable("plates", table => {
    table.increments("id")
    table.text("name")
    table.text("ingredients")
    table.text("category")
    table.text("price")
    table.text("description")
    table.text("avatar")

    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
});

exports.down = knex => knex.schema.dropTable('plates')
