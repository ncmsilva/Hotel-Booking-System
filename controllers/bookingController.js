import { validateAdmin, validateCustomer } from "../utils/UserUtils.js";
import Booking from "../models/booking.js";

export function createBooking(req,res)
{
    if(req.user)
    {
        if(validateCustomer(req))
        {

            Booking.find({"roomId": req.body.roomId, "start":req.body.start, "end":req.body.end}) .then(function(item)
            {
                if(item.length == 0)
                {
                    req.body.email = req.user.email;
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
                    res.status(400).json({"error" : "Room is already booked."});
                }
            }).catch(function(err)
            {
                res.status(400).json(err);
            });

            /*
            req.body.email = req.user.email;
            Booking.create(req.body).then(function(item)
            {
                res.status(200).json(item);
            }).catch(function(err)
            {
                res.status(400).json(err);
            });*/
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
    if(req.user)
    {
        if(validateAdmin(req))
        {
            Booking.find({},"_id bookingId roomId start end").then(function(items)
            {
                res.status(200).json(items);
            }).catch(function(err)
            {
                res.status(400).json(err);
            });
        }
        else
        {
            //res.status(401).json("You are not Autherize to use this API.");
            Booking.find({"email":req.user.email},"_id bookingId roomId start end").then(function(items)
            {
                res.status(200).json(items);
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
export function getBookingById(req,res)
{
    if(req.user)
    {
        if(validateCustomer(req))
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
            res.status(401).json({ message: 'Unauthorized: Invalid or missing token' });
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
        if(validateCustomer(req))
        {
            Booking.findById(req.params.id) .then(function(item)
            {
                //res.status(200).json(item);
                if(item.status == "pending")
                {
                    Booking.findByIdAndUpdate(req.params.id, req.body).then(function(item)
                    {
                        getCategoryById(req, res)
                    }).catch(function(err)
                    {
                        res.status(400).json(err);
                    });
                }
                else{
                    res.status(400).json({"error" : "Booking can't change after it confirmed."});
                }
            }).catch(function(err)
            {
                res.status(400).json(err);
            });
        }
        else
        {
            res.status(401).json({ message: 'Unauthorized: Invalid or missing token' });
        }

    }
    else
    {
        res.status(401).json("You are not Autherize to use this API.");
    }
}
export function confirmBooking(req, res)
{
    if(req.user)
    {
        if(validateAdmin(req))
        {
            Booking.findById(req.params.id) .then(function(item)
            {
                //res.status(200).json(item);
                if(item.status == "pending")
                {
                    Booking.findByIdAndUpdate(req.params.id, {"status":"confirmed"}).then(function(item)
                    {
                        getBookingById(req, res)
                    }).catch(function(err)
                    {
                        res.status(400).json(err);
                    });
                }
                else{
                    res.status(400).json({"error" : "Booking can't change after it confirmed."});
                }
            }).catch(function(err)
            {
                res.status(400).json(err);
            });
            
        }
        else
        {
            res.status(401).json({ message: 'Unauthorized: Invalid or missing token' });
        }
    }
    else
    {
        res.status(401).json("You are not Autherize to use this API.");
    }
}
export function cancelBooking(req, res)
{
    if(req.user)
    {
        if(validateAdmin(req))
        {
            Booking.findById(req.params.id) .then(function(item)
            {
                //res.status(200).json(item);
                if(item.status == "pending")
                {
                    Booking.findByIdAndUpdate(req.params.id, {"status":"cancel", "reason":req.body.reason}).then(function(item)
                    {
                        getBookingById(req, res)
                    }).catch(function(err)
                    {
                        res.status(400).json(err);
                    });
                }
                else{
                    res.status(400).json({"error" : "Booking can't change after it confirmed."});
                }
            }).catch(function(err)
            {
                res.status(400).json(err);
            });
            
        }
        else
        {
            res.status(401).json({ message: 'Unauthorized: Invalid or missing token' });
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
        if(validateCustomer(req))
        {
            Booking.findById(req.params.id) .then(function(item)
            {
                //res.status(200).json(item);
                if(item.status == "pending")
                {
                    Booking.findByIdAndDelete(req.params.id).then(function(item)
                    {
                        res.status(200).json({"status" :"successfull", "id": req.params.id});
                    }).catch(function(err)
                    {
                        res.status(400).json(err);
                    });
                }
                else{
                    res.status(400).json({"error" : "Booking can't cancel after it confirmed."});
                }
            }).catch(function(err)
            {
                res.status(400).json(err);
            });
        }
        else
        {
            res.status(401).json({ message: 'Unauthorized: Invalid or missing token' });
        }
    }
    else
    {
        res.status(403).json("You don't have permission to access this resource.");
    }
    
}