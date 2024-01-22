import { H3Error, createError } from "h3";

export default (param: string) => {
  const route = useRoute();
  const value = route.params[param];

  if (value == null) {
    const errorMessage = `${param} not found on this route. Are you sure you spelled it correctly? params for this route are ${JSON.stringify(
      route.params
    )}`;

    const paramNotFound = new H3Error(errorMessage);
    paramNotFound.statusCode = 501;

    throw createError(paramNotFound);
  }

  return value;
};
