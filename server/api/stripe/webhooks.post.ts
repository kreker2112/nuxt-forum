import Stripe from "stripe";

export default defineEventHandler(async (event) => {
  const stripeEvent = await readBody<Stripe.Event>(event);

  let subscription: Stripe.Subscription | undefined;

  switch (stripeEvent.type) {
    case "customer.subscription.created":
      subscription = stripeEvent.data.object as Stripe.Subscription;
      break;
    case "customer.subscription.deleted":
      subscription = stripeEvent.data.object as Stripe.Subscription;
      break;
    case "customer.subscription.updated":
      subscription = stripeEvent.data.object as Stripe.Subscription;
      break;
    case "invoice.payment_action_required":
      const invoice = stripeEvent.data.object as Stripe.Invoice;
      break;
    default:
      console.log(`Unhandled event type: ${stripeEvent.type}`);
  }
  return `handled ${stripeEvent.type}.`;
});

// case event.type
// when 'customer.subscription.created'
//     subscription = event.data.object
// when 'customer.subscription.deleted'
//     subscription = event.data.object
// when 'customer.subscription.updated'
//     subscription = event.data.object
// when 'invoice.payment_action_required'
//     invoice = event.data.object
// # ... handle other event types
// else
//     puts "Unhandled event type: #{event.type}"
// end
