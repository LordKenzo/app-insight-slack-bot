import * as appInsights from "applicationinsights";

// Evita di inizializzare Application Insights più di una volta
export const initTelemetryClient = (clientName: string, percentage: number) => {
  console.log(
    `CONNECTION STRING: ${process.env.APPLICATIONINSIGHTS_CONNECTION_STRING}`
  );

  const client = new appInsights.TelemetryClient(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "");
  client.config.samplingPercentage = percentage; // percentage % of all telemetry will be sent to Application Insight

  appInsights
    .setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "")
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(false, false)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoDependencyCorrelation(true)
    .setInternalLogging(true, true) // Enable both debug and warning logging
    .setAutoCollectConsole(true, true) // Generate Trace telemetry for winston/bunyan and console logs
    .start();

  return client;
};