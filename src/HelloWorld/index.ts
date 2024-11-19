import { app } from "@azure/functions";
import { initTelemetryClient } from "../../utils/appinsight";

app.http("httpTrigger1", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  route: "v1/slack",
  handler: async (request, context) => {

  // Client per errori critici con campionamento al 100%
  const criticalErrorClient = initTelemetryClient("criticalErrorClient", 100);

  // Client per errori non critici con campionamento al 5%
  const nonCriticalErrorClient = initTelemetryClient("nonCriticalErrorClient", 5);


    context.log(`Http function processed request for url "${request.url}"`);

    const name = request.query.get("name") || (await request.text()) || "World";

    nonCriticalErrorClient.trackEvent({
      name: `helloworld-http-trigger`,
      properties: {
        request: request.url,
        name,
      },
    });

    criticalErrorClient.trackEvent({
      name: `helloworld-http-trigger-sample-error`,
      properties: {
        request: request.url,
        name,
      },
    });

    return { body: `Hello, ${name}!!!` };
  },
});
