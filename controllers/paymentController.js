import dotenv from 'dotenv';
import Stripe from "stripe";

dotenv.config({path: "../.env"});
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const paymentController = async (req, res) => {
    console.log(req.body.amount);
    try {
        const price = req.body.amount;
        const amount = price * 100;
        console.log("new amount-"amount);

        const paymentIntent = await stripe.paymentIntents.create({
            currency: "usd",
            amount: amount,
            payment_method_types: ["card"],
        });
        res.status(200).send({
            success: true,
            message: "Payment All ok",
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in payment method",
            error,
        });
    }
};
