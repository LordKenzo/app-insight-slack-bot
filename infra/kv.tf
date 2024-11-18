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

data "azurerm_role_assignment" "kv_secrets_user" {
  scope                = data.azurerm_key_vault.key_vault.id
  role_definition_name = "Key Vault Secrets User"
  principal_id         = var.client_id
}