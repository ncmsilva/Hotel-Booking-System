import bcrypt from "bcrypt"
import User from "../models/user.js"
import Jwt from "jsonwebtoken"

export function loginUser(req,res)
{
    const user = req.body
    console.log(user.email)

    User.findOne({email: user.email}).then((spuser)=>{
        if(spuser)
        {
            console.log(spuser.email)

            const validatePW = bcrypt.compareSync(user.password, spuser.password);
            if(validatePW)
            {
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
                        "expireIn" : 9000
                    });
            }
            else
            {
                res.status(400).json({ error: "Wrong Password." });
            }
        }
        else
        {
            res.status(400).json({ error: "User not found" });
        }
    }).catch((error)=>
    {
        console.log(error)
        res.status(400).json({ error: error.message });
    })
}

export function createUser(req, res)
{
    const user = req.body;
    const password = req.body.password;
    const saltRounds = 10;
    const passwordHash = bcrypt.hashSync(password, saltRounds);

    console.log(passwordHash)

    user.password = passwordHash;
    const newUser = new User(user);
    newUser.save().then(()=>{
        res.status(201).json(newUser);
    }).catch((error)=>{
        res.status(400).json({ error: error.message });
    })
  }
export function putUsers(req,res)
{
    
}
export function validateAdmin(req)
{
    if(req.user)
    {
        if(req.user.type== "admin")
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
}

export function validateCustomer(req)
{
    if(req.user)
    {
        if(req.user.type== "customer")
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
}

