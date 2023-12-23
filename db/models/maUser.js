const { Model } = require("objection")

class MAuser extends Model {
    static get tableName() {
        return "ma_user"
    }
}

module.exports = MAuser