const express = require("express")
const { upsertUser, upsertCategory, upsertProduct, getCategorByProduct, getCategoryOrProduct, updateCategoryOrProduct } = require("../controller/myAppController")
const { authentication } = require("../auth")
const router = express.Router()

router.use(authentication)

router.post("/insertUser", async (req, res) => {
    try {
        const result = await upsertUser(req.body)
        res.status(200).json({ status: "success", data: result })
    } catch (error) {
        res.status(400).json(error)
    }

})

router.post("/insertCategory", async (req, res) => {
    try {
        const result = await upsertCategory(req.body)
        res.status(200).json({ status: "success", data: result })
    } catch (error) {
        res.status(400).json(error)
    }

})

router.post("/insertProduct", async (req, res) => {
    try {
        const result = await upsertProduct(req.body)
        res.status(200).json({ status: "success", data: result })
    } catch (error) {
        res.status(400).json(error)
    }

})

router.get("/getCateryByProduct", async (req, res) => {
    try {
        const result = await getCategorByProduct()
        res.status(200).json({ status: "success", data: result })
    } catch (error) {
        res.status(400).json(error)
    }

})

router.get("/getCategoryOrProduct", async (req, res) => {
    try {
        if (req.body.type.length === 0) {
            res.status(400).json({ status: "falied", message: "Please give Type" })
            return false
        }
        const result = await getCategoryOrProduct(req.body)
        res.status(200).json({ status: "success", data: result })
    } catch (error) {
        res.status(400).json(error)
    }

})

router.get("/updateCategoryOrProduct", async (req, res) => {
    try {
        if (req.body.type.length === 0) {
            res.status(400).json({ status: "falied", message: "Please give Type" })
            return false
        }
        const result = await updateCategoryOrProduct(req.body)
        res.status(200).json({ status: "success", data: result })
    } catch (error) {
        res.status(400).json(error)
    }

})


module.exports = router