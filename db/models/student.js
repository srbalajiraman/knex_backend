const { Model } = require("objection")

class Student extends Model {
    static get tableName() {
        return 'students'
    }

    // static get relationMappings() {
    //     return {
    //         video: {
    //             relation: Model.HasManyRelation,
    //             modelClass: Video,
    //             join: {
    //                 from: "channel.id",
    //                 to: "video.channelId"
    //             }
    //         }
    //     }
    // }
}

module.exports = Student