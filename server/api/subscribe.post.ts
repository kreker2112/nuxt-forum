import { getUserById } from "../database/repositories/userRepository";
import { getSubscribeUrl } from "~/server/services/stripeService";
import { updateStripeCustomerId } from "../database/repositories/userRepository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const lookupKey = body.lookup_key;
  const userId = body.user_id;

  const user = await getUserById(parseInt(userId));

  const {
    url,
    user: customer,
    shouldUpdateUser,
  } = await getSubscribeUrl(lookupKey, user);

  if (shouldUpdateUser) {
    await updateStripeCustomerId(customer);
  }

  await sendRedirect(event, url);
});
