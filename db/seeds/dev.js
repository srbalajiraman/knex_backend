/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  await knex.raw('TRUNCATE TABLE "user" CASCADE')
  await knex.raw('TRUNCATE TABLE "channel" CASCADE')
  await knex.raw('TRUNCATE TABLE "video" CASCADE')

  await knex('channel').insert([
    {
      id: 1,
      name: "Channel1"
    },
    {
      id: 2,
      name: "Channel2"
    }
  ])

  await knex("user").insert([
    {
      id: 1,
      name: "User1",
      email: "User1@gmail.com",
      channelId: 1
    },
    {
      id: 2,
      name: "User2",
      email: "User2@gmail.com",
      channelId: 2
    },
    {
      id: 3,
      name: "User3",
      email: "User3@gmail.com",
    }
  ])


  await knex("video").insert([
    {
      id: 1,
      title: "VideoUser1Title1",
      channelId: 1
    },
    {
      id: 2,
      title: "VideoUser1Title2",
      channelId: 1
    },
    {
      id: 3,
      title: "VideoUser2Title1",
      channelId: 2
    }
  ])
};
