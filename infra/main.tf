terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = "4.10.0"
    }
  }
}

backend "azurerm" {
  resource_group_name  = "terraform-state-rg"
  storage_account_name = "tfstateaccount"
  container_name      = "tfstate"
  key                 = "prod.terraform.tfstate"
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
  client_id       = var.client_id
  client_secret   = var.client_secret
  tenant_id       = var.tenant_id
}

resource "azurerm_resource_group" "rg" {
  name     = "lf-itn-rg-bot"
  location = "Italy North"
}