import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

export async function httpTrigger(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log("HTTP trigger function processed a request.");
  return { body: `Hello!` };
}

app.http("httpTrigger", {
  methods: ["GET", "POST"],
  authLevel: "function",
  handler: httpTrigger,
});
