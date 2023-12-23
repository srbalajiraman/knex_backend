require('dotenv').config()

const express = require("express")
const app = express()
const dbSetup = require("./db/dbSetup")
const User = require("./db/models/user")
const Channel = require("./db/models/channel")
const Student = require("./db/models/student")
const Test = require("./db/models/test")
const jwt = require("jsonwebtoken")
const { authentication } = require('./auth')

dbSetup()

app.use(express.json())

app.get("/user", async (req, res) => {
    try {
        const { id } = req.body

        if (!id) {
            return res.sendStatus(400).send("Sathikittu mudikittu poo po")
        }

        const user = await User.query().alias("u").select()
            .findById(id)
            .leftJoin("channel as c", "c.id", "u.channelId")
            .where((builder) => {
                if (id) {
                    builder.where({ ["u.id"]: id }).whereILike()
                }
            })

        // .leftJoinRelated("[channel.[video]]", {
        //     aliases: {
        //         channel: "c",
        //         video: "v"
        //     }
        // })
        // .withGraphJoined('[channel(selectchannel).[video(selectvideo)]]').modifiers({
        //     selectchannel: (builder) => {
        //         builder.select([
        //             "name", "id"
        //         ])
        //     },
        //     selectvideo: (builder) => {
        //         builder.select([
        //             "title", "channelId"
        //         ])
        //     }
        // })
        res.json(user)
    } catch (error) {
        console.log(error)
    }
})


app.post("/upsert", async (req, res) => {
    const {
        name,
        email,
        channelId
    } = req.body

    // const insert = await User.query().insert({
    //     // id: 4,
    //     name: name,
    //     email: email,
    //     channelId: channelId
    // })

    // res.send(insert.id)


    try {
        const newUser = await Test.query().insert({
            name: "Sudhakar",
            email: "sudhakar@gmail.com"
        });

        res.status(201).json({ success: true, user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error inserting user' });
    }



    // .then((e) => res.send("Row inserted"))
    //     .catch((err) => res.send(err))
})

app.get("/login", (req, res) => {
    const username = req.body.username
    const user = { name: username }
    console.log("user", user)

    const accessToken = jwt.sign(user, process.env.API_ACCESS_TOKEN, { expiresIn: "1 day" })
    res.json({ accessToken })
})



app.get('/test', authentication, (req, res) => {
    console.log(req.user)
    res.send("success")
})

app.use("/myapp", require("./routes/myAppRoute"))


app.listen(7000, () => console.log("connected..."))