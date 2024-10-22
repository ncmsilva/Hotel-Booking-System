import galleryItem from "../models/galleryItem.js";
import { validateAdmin } from "../utils/UserUtils.js";

export function AddGalleryItem(req, res)
{
    if(req.user)
    {
        if(validateAdmin(req))
        {
            galleryItem.create(req.body).then(function(item)
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
export function GetGalleryItems(req, res)
{
    galleryItem.find({},'_id name description').then(function(items)
    {
        res.status(200).json(items);
    }).catch(function(err)
    {
        res.status(400).json(err);
    });
}
export function GetGalleryItemById(req, res)
{
    if(req.user)
    {
        if(validateAdmin(req))
        {
            galleryItem.findById({_id: req.params.id}).then(function(item)
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
export function UpdateGalleryItem(req, res)
{
    console.log("UpdateGalleryItem")
    if(req.user)
    {
        if(validateAdmin(req))
        {
            galleryItem.findByIdAndUpdate(req.params.id, req.body).then(function(item)
            {
                GetGalleryItemById(req, res)
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
export function DeleteGalleryItem(req, res)
{
    if(req.user)
    {
        if(validateAdmin(req))
        {
            galleryItem.findByIdAndDelete(req.params.id).then(function(item)
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