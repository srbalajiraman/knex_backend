const MACategory = require("../db/models/maCategory")
const MAuser = require("../db/models/maUser")
const MAProduct = require("../db/models/maProduct")

const upsertUser = ({
    first_name,
    last_name
}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await MAuser.query().insert({
                first_name: first_name,
                last_name: last_name
            })
            resolve(`User ${result} created successfully....`)
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

const upsertCategory = ({
    category_name,
    user_id
}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await MACategory.query().insert({
                category_name: category_name,
                created_by: user_id,
                updated_by: user_id
            })
            resolve(`Catergory (${result.id}) created successfully...`)
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

const upsertProduct = ({
    product_name,
    category_id,
    price,
    expired_date,
    user_id
}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await MAProduct.query().insert({
                product_name: product_name,
                category_id: category_id,
                price: price,
                expired_date: expired_date,
                created_by: user_id,
                updated_by: user_id
            })
            resolve(`Product (${result.id}) created successfully...`)
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

const getCategorByProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await MACategory.query().alias("cat").select([
                "cat.id",
                "cat.category_name"
            ])
                .withGraphJoined('[maProduct(selectproduct)]').modifiers({
                    selectproduct: (builder) => {
                        builder.select([
                            "product_name",
                            "id",
                            "price",
                            "onboarded_date",
                            "expired_date"
                        ])
                    }
                })
            resolve(result)
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

const getCategoryOrProduct = ({
    type,
    category_id,
    limit = 10,
    offset = 0
}) => {
    return new Promise(async (resolve, reject) => {
        try {
            switch (type) {
                case "category":
                    const query_category = MACategory.query().select("id as category_id", "category_name")
                        .where("is_active", true)
                    const [cat_count, category] = await Promise.all([query_category.resultSize(), query_category.limit(limit).offset(offset)])
                    resolve({ count: cat_count, data: category })
                case "product":
                    const query_product = MAProduct.query()
                        .select("id as product_id",
                            "product_name", "price", "expired_date", "onboarded_date", "category_id")
                        .where((builder) => {
                            if (category_id) {
                                builder.where({ ["category_id"]: category_id })
                            }
                            builder.where({ ["is_active"]: true })
                        })
                    const [pro_count, product] = await Promise.all([query_product.resultSize(), query_product.limit(limit).offset(offset)])
                    resolve({ count: pro_count, data: product })
                default:
                    reject("Please give Type")
                    break;
            }
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

const updateCategoryOrProduct = ({
    type,
    name,
    id
}) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result
            switch (type) {
                case "category":
                    result = await MACategory.query()
                        .patch({
                            category_name: name
                        })
                        .where({ id })
                    resolve(result)
                case "product":
                    result = await MAProduct.query()
                        .patch({
                            product_name: name
                        })
                        .where({ id })
                    resolve(result)
                default:
                    break;
            }
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

module.exports = {
    upsertUser,
    upsertCategory,
    upsertProduct,
    getCategorByProduct,
    getCategoryOrProduct,
    updateCategoryOrProduct
}