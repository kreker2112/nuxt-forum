import { H3Event, sendError, createError } from "h3";
import { getMappedError } from "../errorMapper";

export default async function sendDefaultErrorResponse(
  event: H3Event,
  errorType: string,
  statusCode: number,
  error: any
) {
  const parsedErrors = getMappedError(errorType, error);
  return sendError(
    event,
    createError({
      statusCode: statusCode,
      statusMessage: "Invalid Data Provided",
      data: parsedErrors,
    })
  );
}
