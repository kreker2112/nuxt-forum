import Stripe from "stripe";
import { handleSubscriptionChange } from "@/server/services/stripeService";

// export default defineEventHandler(async (event) => {
//   const stripeEvent = await readBody<Stripe.Event>(event);

//   let subscription: Stripe.Subscription | undefined;

//   switch (stripeEvent.type) {
//     case "customer.subscription.created":
//       subscription = stripeEvent.data.object as Stripe.Subscription;
//       handleSubscriptionChange(subscription, stripeEvent.created);
//       break;
//     case "customer.subscription.deleted":
//       subscription = stripeEvent.data.object as Stripe.Subscription;
//       handleSubscriptionChange(subscription, stripeEvent.created);
//       break;
//     case "customer.subscription.updated":
//       subscription = stripeEvent.data.object as Stripe.Subscription;
//       handleSubscriptionChange(subscription, stripeEvent.created);
//       break;
//     case "invoice.payment_action_required":
//       const invoice = stripeEvent.data.object as Stripe.Invoice;
//       break;
//     default:
//       console.log(`Unhandled event type: ${stripeEvent.type}`);
//   }
//   return `handled ${stripeEvent.type}.`;
// });

export default defineEventHandler(async (event) => {
  const stripeEvent = await readBody<Stripe.Event>(event);

  let subscription: Stripe.Subscription | undefined;

  const isSubscriptionEvent = stripeEvent.type.startsWith(
    "customer.subscription"
  );

  if (isSubscriptionEvent) {
    subscription = stripeEvent.data.object as Stripe.Subscription;
    handleSubscriptionChange(subscription, stripeEvent.created);
    return `handled ${stripeEvent.type}.`;
  }

  console.log(`Unhandled event type ${stripeEvent.type}`);

  event.node.res.statusCode = 400;

  return `could not handle ${stripeEvent.type}. No functionality set.`;
});
