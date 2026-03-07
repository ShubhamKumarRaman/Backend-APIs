const Article = require('../models/Article')

// Get all articles
exports.getArticles = async(req,res)=>{
    try {
        const {tag} = req.query;

        let filter = {};

        if(tag){
            filter.tags = tag;
        }

        const articles = await Article.find(filter);

        res.json(articles);
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

// Get single article
exports.getArticleById = async(req,res)=>{
    try {
        const article = await Article.findById(req.params.id);

        if(!article){
            return res.status(404).json({message:'Article not found'})
        }

        res.json(article);
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

// Create article
exports.createArticle = async(req,res)=>{
    try {
        const article = await Article.create(req.body);

        res.status(201).json(article);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// Update article
exports.updateArticle = async(req,res)=>{
    try {
        const article = await Article.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {new:true}
        )
        res.json(article);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// Delete article
exports.deleteArticle = async(req,res)=>{
    try {
        await Article.findByIdAndDelete(req.params.id);
        res.json({message:"Article deleted"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}