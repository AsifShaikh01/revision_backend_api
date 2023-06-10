const express = require("express");

const emiRouter = express.Router();

emiRouter.post("/" , (req,res)=>{
    const {amount , rate ,tenure} = req.body;
    try {
        let i = (amount *(rate * 0.01))/tenure
        let emi = ((amount/tenure) + i).toFixed(2)
        let total = amount + (i*36)

        res.send({"EMI" : emi , "total_payment" : total , "interest_payable":i*36 })
        
    } catch (error) {
        res.send(error)
    }
})

module.exports = {
    emiRouter
}