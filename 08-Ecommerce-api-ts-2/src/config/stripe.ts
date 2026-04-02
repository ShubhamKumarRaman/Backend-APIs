import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
    throw new Error("STRIPE_SECRET_KEY is missing. Add it to .env or your environment variables.");
}

const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2026-03-25.dahlia",
});

export default stripe;