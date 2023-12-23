const { Model } = require("objection")
const MAProduct = require("./maProduct")

class MACategory extends Model {
    static get tableName() {
        return 'ma_categories'
    }

    static get relationMappings() {
        return {
            maProduct: {
                relation: Model.HasManyRelation,
                modelClass: MAProduct,
                join: {
                    from: "ma_categories.id",
                    to: "ma_product.category_id"
                }
            }
        }
    }
}

module.exports = MACategory