import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

export async function helloWorld(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log("HTTP trigger function processed a request.");

  const name = request.query.get("name") || "world";

  return {
    body: `Hello, ${name}!`,
    headers: {
      "Content-Type": "text/plain",
    },
  };
}

app.http("helloWorld", {
  methods: ["GET", "POST"],
  authLevel: "function",
  handler: helloWorld,
});
