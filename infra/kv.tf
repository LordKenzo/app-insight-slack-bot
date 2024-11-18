data "azurerm_key_vault" "key_vault" {
  name                = "lf-itn-kv"
  resource_group_name = "lf-d-itn-common-rg"
}

data "azurerm_key_vault_secret" "appinsight_instrumentationkey" {
  name         = "APPINSIGHTS-INSTRUMENTATIONKEY"
  key_vault_id = data.azurerm_key_vault.key_vault.id
}

data "azurerm_key_vault_secret" "appinsight_connection_string" {
  name         = "APPLICATIONINSIGHTS-CONNECTION-STRING"
  key_vault_id = data.azurerm_key_vault.key_vault.id
}