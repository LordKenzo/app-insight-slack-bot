import * as appInsights from "applicationinsights";

import "dotenv/config";
require("dotenv").config();

// Avoid to initialize Application Insights more than once
export const initTelemetryClient = () => {
  appInsights
    .setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY || "")
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(false, false)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoDependencyCorrelation(true);

  return appInsights.defaultClient;
};
