const Product = require('../models/product')


const getAllProducts = async (req,res)=>{
   const {featured,company,name,sort,fields} = req.query
    const objectQuery = {}

    if(featured){
        objectQuery.featured = featured === 'true' ? true: false
    }

    if(company){
        objectQuery.company = company
    }

    if (name){
        objectQuery.name = {$regex: name, $options: 'i'}

    }

    let result =  Product.find(objectQuery)
if(sort){
   const sortList = sort.split(',').join( ' ')
   result  = result.sort(sortList)
}else result = result.sort('createdAt')

if(fields){
   const fieldList = fields.split(',').join( ' ')
   result  = result.select(fieldList)
}

const page = Number(req.query.page) || 1
const limit = Number(req.query.limit) || 10
const skip = (page - 1) * limit

result =  result.skip(skip).limit(limit)

    const products = await result
    res.status(200).json({products, nbHits: products.length})

    
}





module.exports = {
    getAllProducts
}