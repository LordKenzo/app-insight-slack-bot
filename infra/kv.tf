# data "azurerm_key_vault" "key_vault" {
#   name                = "lf-itn-kv"
#   resource_group_name = "lf-d-itn-common-rg"
# }

# data "azurerm_key_vault_secret" "subscription_id" {
#   name         = "subscription-id"
#   key_vault_id = data.azurerm_key_vault.key_vault.id
# }