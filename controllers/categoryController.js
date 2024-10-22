import category from "../models/category.js";
import { validateAdmin } from "../utils/UserUtils.js";

export function createCategory(req,res)
{
    if(req.user)
    {
        if(validateAdmin(req))
        {
            category.create(req.body).then(function(item)
            {
                res.status(200).json(item);
            }).catch(function(err)
            {
                res.status(400).json(err);
            });
        }
        else
        {
            res.status(401).json("You are not Autherize to use this API.");
        }
    }
    else
    {
        res.status(401).json("You are not Autherize to use this API.");
    }
}
export function getCategories(req,res)
{
    category.find({},"_id name description").then(function(items)
    {
        res.status(200).json(items);
    }).catch(function(err)
    {
        res.status(400).json(err);
    });
}
export function getCategoryById(req,res)
{
    if(req.user)
        {
            if(validateAdmin(req))
            {
                category.findById(req.params.id) .then(function(item)
                {
                    res.status(200).json(item);
                }).catch(function(err)
                {
                    res.status(400).json(err);
                });
            }
            else
            {
                res.status(401).json("You are not Autherize to use this API.");
            }
        }
        else
        {
            res.status(401).json("You are not Autherize to use this API.");
        }
}
export function UpdateCategory(req, res)
{
    if(req.user)
    {
        if(validateAdmin(req))
        {
            const data = req.body;
            delete data.name
            category.findByIdAndUpdate(req.params.id, data).then(function(item)
            {
                getCategoryById(req, res)
            }).catch(function(err)
            {
                res.status(400).json(err);
            });
        }
    }
    else
    {
        res.status(401).json("You are not Autherize to use this API.");
    }
}
export function DeleteCategory(req, res)
{
    if(req.user)
    {
        if(validateAdmin(req))
        {
            category.findByIdAndDelete(req.params.id).then(function(item)
            {
                res.status(200).json({"status" :"successfull", "id": req.params.id});
            }).catch(function(err)
            {
                res.status(400).json(err);
            });
        }
    }
    else
    {
        res.status(401).json("You are not Autherize to use this API.");
    }
    
}