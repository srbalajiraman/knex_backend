const { Model } = require("objection")
const Channel = require("./channel")

class User extends Model {
    static get tableName() {
        return 'user'
    }

    static get relationMappings() {
        return {
            channel: {
                relation: Model.HasOneRelation,
                modelClass: Channel,
                join: {
                    from: "user.channelId",
                    to: "channel.id"
                }
            }
        }
    }
}

module.exports = User