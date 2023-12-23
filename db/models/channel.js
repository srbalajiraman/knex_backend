const { Model } = require("objection")
const Video = require("./video")

class Channel extends Model {
    static get tableName() {
        return 'channel'
    }

    static get relationMappings() {
        return {
            video: {
                relation: Model.HasManyRelation,
                modelClass: Video,
                join: {
                    from: "channel.id",
                    to: "video.channelId"
                }
            }
        }
    }
}

module.exports = Channel