exports.up = function (knex) {
    return knex.schema
        .createTable("ma_user", (table) => {
            table.increments("id").primary()
            table.string("first_name").notNullable()
            table.string("last_name").notNullable()
            table.timestamp("created_at").defaultTo(knex.fn.now())
            table.timestamp("updated_at").defaultTo(knex.fn.now())
        })
        .createTable("ma_categories", (table) => {
            table.increments("id").primary()
            table.string("category_name").notNullable()
            table.timestamp("created_at").defaultTo(knex.fn.now())
            table.timestamp("updated_at").defaultTo(knex.fn.now())
            table.integer("created_by").references("id").inTable("ma_user").notNullable()
            table.integer("updated_by").references("id").inTable("ma_user").notNullable()
        })
        .createTable("ma_product", (table) => {
            table.increments("id").primary()
            table.string("product_name").notNullable()
            table.integer("category_id").references("id").inTable("ma_categories")
            table.integer("price").notNullable()
            table.timestamp("onboarded_date").notNullable()
            table.timestamp("expired_date").notNullable()
            table.timestamp("created_at").defaultTo(knex.fn.now())
            table.timestamp("updated_at").defaultTo(knex.fn.now())
            table.integer("created_by").references("id").inTable("ma_user").notNullable()
            table.integer("updated_by").references("id").inTable("ma_user").notNullable()
        })
}

exports.down = function (knex) {
    return knex.schema
        .raw("ALTER TABLE ma_product ALTER COLUMN onboarded_date TYPE date")
        .raw("ALTER TABLE ma_product ALTER COLUMN onboarded_date SET DEFAULT now()")
        .raw("ALTER TABLE ma_product ALTER COLUMN expired_date TYPE date");
    //     // .dropTableIfExists("ma_product")
    //     // .dropTableIfExists("ma_categories")
    //     // .dropTableIfExists("ma_user")

    //     .alterTable("ma_categories", (table) => {
    //         table.raw("ALTER COLUMN onboarded_date TYPE date SET DEFAULT now()")
    //         table.raw("ALTER COLUMN expired_date TYPE date")
    //     })
    // // .alterTable("ma_product", (table) => {
    // //     table.integer("created_by").references("id").inTable("ma_user").notNullable()
    // //     table.integer("updated_by").references("id").inTable("ma_user").notNullable()
    // // })

}