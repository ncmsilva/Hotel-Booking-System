import { validateAdmin } from "./userController.js";
import Booking from "../models/booking.js";

export function createBooking(req,res)
{
    if(req.user)
    {
        if(validateAdmin(req))
        {
            Booking.create(req.body).then(function(item)
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
export function getBookings(req,res)
{
    Booking.find({},"_id bookingId roomId start end").then(function(items)
    {
        res.status(200).json(items);
    }).catch(function(err)
    {
        res.status(400).json(err);
    });
}
export function getBookingById(req,res)
{
    if(req.user)
        {
            if(validateAdmin(req))
            {
                Booking.findById(req.params.id) .then(function(item)
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
export function UpdateBooking(req, res)
{
    if(req.user)
    {
        if(validateAdmin(req))
        {
            Booking.findByIdAndUpdate(req.params.id, req.body).then(function(item)
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
export function DeleteBooking(req, res)
{
    if(req.user)
    {
        if(validateAdmin(req))
        {
            Booking.findByIdAndDelete(req.params.id).then(function(item)
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