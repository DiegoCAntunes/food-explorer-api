// Migration for favorites table
exports.up = knex => knex.schema.createTable("favorites", table => {
    table.increments("id")
    table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE")
    table.json("plate")

    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
});

exports.down = knex => knex.schema.dropTable("favorites");
