const { Model } = require("objection")
const MACategory = require("./maCategory")

class MAProduct extends Model {
    static get tableName() {
        return "ma_product"
    }

    static get relationMappings() {
        return {
            maCategory: {
                relation: Model.BelongsToOneRelation,
                modelClass: MACategory,
                join: {
                    from: "ma_product.cateory_id",
                    to: "ma_categories.id"
                }
            }
        }
    }
}

module.exports = MAProduct