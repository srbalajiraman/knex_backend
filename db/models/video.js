const { Model } = require("objection")
const Channel = require("./channel")

class Video extends Model {
    static get tableName() {
        return 'video'
    }

    static get relationMappings() {
        return {
            channel: {
                relation: Model.BelongsToOneRelation,
                modelClass: Channel,
                join: {
                    from: "video.channelId",
                    to: "channel.id"
                }
            }
        }
    }
}

module.exports = Video