import { app } from "@azure/functions";

app.http("httpTrigger1", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  route: "v1/slack",
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const name = request.query.get("name") || (await request.text()) || "World";

    return { body: `Hello, ${name}!!!` };
  },
});
