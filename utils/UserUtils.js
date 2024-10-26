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
        else if(req.user.type== "admin")//user inheritance admin has customer rights too
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