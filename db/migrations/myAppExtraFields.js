exports.up = function (knex) {
    return knex.schema
        .alterTable("ma_categories", (table) => {
            table.boolean("is_active").defaultTo(true)
        })
        .alterTable("ma_product", (table) => {
            table.boolean("is_active").defaultTo(true)
        })
}

exports.down = function (knex) {
    return knex.schema
        .alterTable("ma_categories", (table) => {
            table.dropColumn("is_active")
        })
        .alterTable("ma_product", (table) => {
            table.dropColumn("is_active")
        })
}