exports.up = function (knex) {
    return knex.schema
        .createTable("test_table1", (table) => {
            table.increments("id")
            table.string("name").notNullable()
            table.timestamps(true)
        })
}

exports.down = function (knex) {
    return knex.schema
        .alterTable("test_table1", (table) => {
            table.string("email").notNullable()
        })
}