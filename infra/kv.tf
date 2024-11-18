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

resource "azurerm_key_vault_access_policy" "terraform_sp" {
  key_vault_id = data.azurerm_key_vault.key_vault.id
  tenant_id    = var.tenant_id
  object_id    = var.client_id    # Questo è l'object ID del service principal

  secret_permissions = [
    "Get",
    "List"
  ]
}