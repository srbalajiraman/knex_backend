const {Model} = require("objection")

class Test extends Model{
    static get tableName(){
        return 'test_table'
    }
}

module.exports = Test