exports.paginate =async (limitValue, skipValue,sort,schema) => {
    if (limitValue && skipValue >=0&& sort){
   return results = await schema.findAll({
        limit: limitValue,
        offset: skipValue,
        order: [
            [sort, 'ASC']
        ]})
    }else{ 
return await schema.findAll()}
}