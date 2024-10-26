import bcrypt from "bcrypt"
import User from "../models/user.js"
import Jwt from "jsonwebtoken"
import { validateAdmin } from "../utils/UserUtils.js";

export function loginUser(req, res) {
    const user = req.body
    console.log(user.email)

    User.findOne({ email: user.email }).then((spuser) => {
        if (spuser) {
            if (!spuser.disabled) 
            {
                console.log(spuser.email)
                const validatePW = bcrypt.compareSync(user.password, spuser.password);
                if (validatePW) {
                    const token = Jwt.sign({
                        id: spuser._id,
                        email: spuser.email,
                        Fname: spuser.firstName,
                        Lname: spuser.lastName,
                        type: spuser.type,
                    }, process.env.JWT_key, {
                        expiresIn: "30m"
                    })
                    res.status(201).json(
                        {
                            "status": "success",
                            "token": token,
                            "expireIn": 9000
                        });
                }
                else {
                    res.status(400).json({ error: "Wrong Password." });
                }
            }
            else 
            {
                res.status(403).json({
                    "error": "Access Denied",
                    "message": "Your account has been banned. Please contact support for more information."
                  });
            }
        }
        else {
            res.status(400).json({ error: "User not found" });
        }
    }).catch((error) => {
        console.log(error)
        res.status(400).json({ error: error.message });
    })
}
export function createUser(req, res) {
    const user = req.body;
    const password = req.body.password;
    const saltRounds = 10;
    const passwordHash = bcrypt.hashSync(password, saltRounds);

    console.log(passwordHash)

    user.password = passwordHash;
    const newUser = new User(user);
    newUser.save().then(() => {
        res.status(201).json(newUser);
    }).catch((error) => {
        res.status(400).json({ error: error.message });
    })
}
export function blockUser(req, res) 
{
    if(req.user)
        {
            if(validateAdmin(req))
            {
                User.findByIdAndUpdate(req.params.id, {disabled:true}).then(function(items)
                {
                    res.status(200).json("User banned from the system.");
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
export function getUsers(req,res)
{
    if(req.user)
    {
        if(validateAdmin(req))
        {
            User.find({},"_id email firstName lastName type").then(function(items)
            {
                res.status(200).json(items);
            }).catch(function(err)
            {
                res.status(400).json(err);
            });
        }
        else
        {
            console.log("*********************")
            res.status(401).json("You are not Autherize to use this API.");
        }
    }
    else
    {
        console.log("***********000000**********")
        res.status(401).json("You are not Autherize to use this API.");
    }
}
export function getUserById(req,res)
{
    if(req.user)
    {
        if(validateAdmin(req))
        {
            User.findById(req.params.id) .then(function(item)
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

