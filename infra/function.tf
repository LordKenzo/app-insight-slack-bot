
resource "azurerm_service_plan" "sp_bot" {
  name                = "lf-itn-sp-bot"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  os_type             = "Linux"
  sku_name            = "S1"
}


resource "azurerm_linux_function_app" "func_bot" {
  name                        = "lf-itn-func-bot"
  location                    = azurerm_resource_group.rg.location
  resource_group_name         = azurerm_resource_group.rg.name
  service_plan_id             = azurerm_service_plan.sp_bot.id
  storage_account_name        = azurerm_storage_account.sa_bot.name
  storage_account_access_key  = azurerm_storage_account.sa_bot.primary_access_key

  site_config {
    application_stack {
      node_version = "20"
    }
  }

  app_settings = {
    "APPINSIGHTS_INSTRUMENTATIONKEY" = azurerm_application_insights.appinsights.instrumentation_key
    "FUNCTIONS_WORKER_RUNTIME"       = "node"
  }
}

resource "azurerm_linux_function_app_slot" "func_bot_staging" {
  name                        = "staging"
  function_app_id             = azurerm_linux_function_app.func_bot.id
  storage_account_name        = azurerm_storage_account.sa_bot.name
  storage_account_access_key  = azurerm_storage_account.sa_bot.primary_access_key

  site_config {
    application_stack {
      node_version = "20"
    }
  }

  app_settings = {
    "APPINSIGHTS_INSTRUMENTATIONKEY" = azurerm_application_insights.appinsights.instrumentation_key
    "FUNCTIONS_WORKER_RUNTIME"       = "node"
  }
}