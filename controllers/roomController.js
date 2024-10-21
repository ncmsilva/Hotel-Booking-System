import Room from "../models/Room.js";
import { validateAdmin } from "./userController.js";

export function createRoom(req,res)
{
    if(req.user)
    {
        if(validateAdmin(req))
        {
            Room.create(req.body).then(function(item)
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
export function getRooms(req,res)
{
    Room.find({},"_id roomId category").then(function(items)
    {
        res.status(200).json(items);
    }).catch(function(err)
    {
        res.status(400).json(err);
    });
}
export function getRoomById(req,res)
{
    if(req.user)
        {
            if(validateAdmin(req))
            {
                Room.findById(req.params.id) .then(function(item)
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
export function UpdateRoom(req, res)
{
    if(req.user)
    {
        if(validateAdmin(req))
        {
            Room.findByIdAndUpdate(req.params.id, req.body).then(function(item)
            {
                getroomById(req, res)
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
export function DeleteRoom(req, res)
{
    if(req.user)
    {
        if(validateAdmin(req))
        {
            Room.findByIdAndDelete(req.params.id).then(function(item)
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