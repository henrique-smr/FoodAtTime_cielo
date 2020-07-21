import jsonschema from 'jsonschema';

const cardSchema = {
	"id":"/Card",
	"type":"object",
	"properties":
	{
		"CardNumber":
		{
			"type":"string",
			"maxLength":19,
			"minLength":16,
			"pattern":"^[0-9]{16}$"
		},
		"Holder":
		{
			"type":"string",
			"maxLength":25,
		},
		"ExpirationDate":
		{
			"type":"string",
			"maxLength":4,
			"pattern":"^([0-9]{4})[\/](1[0-2]|0[0-9])$"

		},
		"SecurityCode":
		{
			"type":"string",
			"pattern":"^[0-9]{4}|[0-9]{3}$"
		},
		"Brand":
		{
			"type":"string",
			"enum":	["Visa" , "Master" , "Amex" , "Elo" , "Aura" , "JCB" , "Diners" , "Discover" , "Hipercard" , "Hiper"]
		},
		"SaveCard":
		{
			"type":"boolean"
		},
		"Cryptogram":
		{
			"type":"string"
		},
	},
	"required":["CardNumber","Holder","ExpirationDate","Brand"]

}

const paymentSchema = {
	"id":"/Payment",
	"type":"object",
	"properties":
	{
		"type":
		{
			"type":"string",
			"enum":["CreditCard","DebitCard","EletronicTransfer", "Boleto", "qrcode"]
		},
		"amount":
		{
			"type":"integer"
		},
		"serviceTaxAmount":
		{
			"type":"number"
		},
		"installments":
		{
			"type":"integer"
		},
		"interest":
		{
			"type":"string",
			"enum":["ByMerchant", "ByIssuer"]

		},
		"capture":
		{
			"type":"boolean"
		},
		"authenticate":
		{
			"type":"boolean"
		},
		"recurrent":
		{
			"type":"boolean"
		},
		"recurrentPayment":
		{
			"type":"object" //TODO:Implementar recurrentPayment schema
		},
		"creditCard":
		{
			"$ref":"/Card"
		},
		"debitCard":
		{
			"$ref":"/Card"
		},
		"proofOfSale":
		{
			"type":"string",
			"maxLength":6,
			"minLength":1,
			"pattern":"^[0-9]{1,6}$"
		},
		"authorizationCode":
		{
			"type":"string",
			"maxLength":6,
			"minLength":1,
			"pattern":"^[0-9]{1,6}$"
		},
		"softDescriptor":
		{
			"type":"string",
			"maxLength":13,
			"pattern":"^[a-zA-Z0-9]{0,13}$"
		},
		"returnUrl":
		{
			"type":"string",
			"format":"uri"
		},
		"provider":
		{
			"type":"string",
			"example":["Cielo","Bradesco2","Simulado"]
		},
		"paymentId":
		{
			"type":"string",
			"maxLength":36,
			"minLength":36,
			"pattern":"	^([a-zA-Z0-9]{8}-([a-zA-Z0-9]{4}-){3}[a-zA-Z0-9]{12})$"
		},
		"tid":
		{
			"type":"string",
			"maxLength":20,
			"pattern":"^[a-zA-Z0-9]{1,20}$"
		},
		
		"receivedDate":
		{
			"type":"string"
		},
		"capturedAmount":
		{
			"type":"integer"
		},
		"capturedDate":
		{
			"type":"string"
		},
		"currency":
		{
			"type":"string"
		},
		"country":
		{
			"type":"string",
			"const":"BRA"
		},
		"returnCode":
		{
			"type":"string"
		},
		"returnMessage":
		{
			"type":"string"
		},
		"status":
		{
			"type":"number"
		},
		"links":
		{
			"type":"array",
			"items":
			{
				"type":"object",
				"properties":
				{
					"Method":{"type":"string"},
					"Rel":{"type":"string"},
					"Href":{"type":"string"}
				},
				"additionalProperties":false,
				"required":["Method","Rel","Href"]
			}
		},
		"url":
		{
			"type":"string",
			"format":"uri"
		},
		"number":
		{
			"type":"string"
		},
		"barCodeNumber":
		{
			"type":"string"
		},
		"digitableLine":
		{
			"type":"string"
		},
		"address":
		{
			"type":"string"
		},
		"expirationDate":
		{
			"type":"string",
			"format":"date"
		},
		"boletoNumber":
		{
			"type":"string"
		},
		"assignor":
		{
			"type":"string"
		},
		"demonstrative":
		{
			"type":"string"
		},
		"identification":
		{
			"type":"string"
		},
		"instructions":
		{
			"type":"string"
		}
	},
	"required":["type"],
	"additionalProperties":false
}


const addressSchema = {
	"id":"/Address",
	"type":"object",
	"properties":
	{
		"street":
		{
			"type":"string"
		},
		"number":
		{
			"type":"string"
		},
		"complement":
		{
			"type":"string"
		},
		"zipCode":
		{
			"type":"string"
		},
		"district":
		{
			"type":"string"
		},
		"city":
		{
			"type":"string"
		},
		"state":
		{
			"type":"string"
		},
		"country":
		{
			"type":"string"
		}
	},
	"required":["street","number","state","city","district","zipCode","country"],
	"additionalProperties":false
}

const customerSchema = {

	"id":"/Customer",
	"type":"object",
	"properties":
	{
		"name":
		{
			"type":"string"
		},
		"email":
		{
			"type":"string"
		},
		"birthDate":
		{
			"type":"string"
		},
		"identity":
		{
			"type":"string"
		},
		"identityType":
		{
			"type":"string"
		},
		"address":
		{
			"$ref":"/Address"
		},
		"deliveryAdress":
		{
			"$ref":"/Address"
		}

	},
	"required":["name","birthDate","identity","identityType","address"],
	"additionalProperties":false
}


const customerValidator = new jsonschema.Validator();
customerValidator.addSchema(addressSchema,'/Address')
customerValidator.addSchema(customerSchema,'/Customer')

const paymentValidator = new jsonschema.Validator();
paymentValidator.addSchema(cardSchema,'/Card')
paymentValidator.addSchema(paymentSchema,'/Payment')

export function validatePaymentJson(json)
{
	paymentValidator.validate(json,'/Payment').errors.forEach((error)=>{
		console.log("Error ao validar dados de pagamento");
		console.log(error)
		return false
	})
	return true
}

export function validateCustomerJson(json)
{
	customerValidator.validate(json,'/Customer').errors.forEach((error)=>{
		console.log("Error ao validar dados de cliente");
		console.log(error)
		return false
	})
	return true
}