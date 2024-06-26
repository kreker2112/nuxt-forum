import Stripe from "stripe";
import sendDefaultErrorResponse from "~~/server/app/errors/responses/DefaultErrorsResponse";
import { handleSubscriptionChange } from "~~/server/services/stripeService";

export default defineEventHandler(async (event) => {
  const stripeEvent = await readBody<Stripe.Event>(event);

  let subscription: Stripe.Subscription | undefined;

  const isSubscriptionEvent = stripeEvent.type.startsWith(
    "customer.subscription"
  );

  if (isSubscriptionEvent) {
    subscription = stripeEvent.data.object as Stripe.Subscription;
    if (subscription) {
      handleSubscriptionChange(subscription, stripeEvent.created);
      return `handled ${stripeEvent.type}.`;
    }
  }

  return sendDefaultErrorResponse(
    event,
    "oops",
    400,
    `could not handle ${stripeEvent.type}. No functionality set.`
  );
});
