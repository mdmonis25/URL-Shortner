const {nanoid} = reuire('nanoid');
const URL = require('../models/url')


async function handleGenerateNewUrl(req,res){
    const body = req.body;
    if(!body.url)  return res.status(400).json({error:"URL is required"});
    const shortID = nanoid(8);
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHisory:[],
    })
    return res.json({id: shortID})
}
module.exports = {
    handleGenerateNewUrl,
}