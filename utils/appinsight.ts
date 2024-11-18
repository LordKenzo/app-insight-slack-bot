import * as appInsights from "applicationinsights";
import "dotenv/config";
require("dotenv").config();

// Evita di inizializzare Application Insights più di una volta
export const initTelemetryClient = () => {
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
    .start();

  return appInsights.defaultClient;
};
