import { app } from "@azure/functions";
import { initTelemetryClient } from "../utils/appinsight";

app.http("httpTrigger1", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  route: "v1/slack",
  handler: async (request, context) => {
    const client = initTelemetryClient();

    context.log(`Http function processed request for url "${request.url}"`);

    const name = request.query.get("name") || (await request.text()) || "World";

    client.trackEvent({
      name: `helloworld-http-trigger`,
      properties: {
        request: request.url,
        name,
      },
    });

    return { body: `Hello, ${name}!!!` };
  },
});
