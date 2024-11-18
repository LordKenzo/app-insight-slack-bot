import * as appInsights from "applicationinsights";
import "dotenv/config";
require("dotenv").config();

// Evita di inizializzare Application Insights più di una volta
export const initTelemetryClient = (percentage: number) => {
  console.log(
    `CONNECTION STRING: ${process.env.APPLICATIONINSIGHTS_CONNECTION_STRING}`
  );
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
  appInsights.defaultClient.config.samplingPercentage = percentage; // percentage % of all telemetry will be sent to Application Insight
  return appInsights.defaultClient;
};
