import {validatePaymentJson} from "./schema.js"



export default class Payment
{
	constructor(amount, installments=1){
		
		//Preço em centavos de R$
	   		this.amount = amount

	   	//Taxa de serviço
			this.serviceTaxAmount = null
		
		//--> Parcelamento

			//numero de parcelas
			this.installments = installments
			//Tipo de parcelamento - Loja (ByMerchant) ou Cartão (ByIssuer).
			this.interest = null

		//<-- Parcelamento

		//Captura da compra. Se for TRUE, é feita o quanto antes.
			this.capture = null

		//Define se o comprador será direcionado ao Banco emissor para autenticação do cartão
			this.authenticate = false

		//-->Recorrência

		/*
				A reconrrência pode ser a cargo do lojista (FAT). Neste caso {Payment.recurrent:True}
			Ou
				A recorrência é automatizada pela cielo. Neste caso{Payment.recurrent:False} e o objeto recurrentPayment deve estar presente
		*/

			//Se a cobrança é recorrente ou não. Deve ser True se 
				this.recurrent = null
			//Objeto de recorência automática
		   		this.recurrentPayment = null
				/*
				"RecurrentPayment":{
					"RecurrentPaymentId": "61e5bd30-ec11-44b3-ba0a-56fbbc8274c5",
					"NextRecurrency": "2015-11-04",
					"EndDate": "2019-12-01",
					"Interval": "SemiAnnual",
					"Link": {
						"Method": "GET",
						"Rel": "recurrentPayment",
						"Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/RecurrentPayment/{RecurrentPaymentId}"
					},
					"AuthorizeNow": true
				*/
		//<-- Reconrrência

		//Classe de cartão de crédito:
			this.creditCard = null
			/*
			"CreditCard":{  
				"CardNumber":"1234123412341231",
				"Holder":"Teste Holder",
				"ExpirationDate":"12/2030",
				"SecurityCode":"123",
				"SaveCard":"false",
				"Brand":"Visa",
				"CardOnFile":{
					"Usage": "Used",
					"Reason":"Unscheduled"
				}
			}
			*/
		//Número de ProOfSale
	   		this.proofOfSale = null

		//Código de autorização
			this.authorizationCode = null

		//Texto do extrato
			this.softDescriptor = null

		//URL retornado pelo pedido
			this.returnUrl = null

		//Provedor da transação (Cielo para débito/crédito -- BB ou Bradesco para Boleto)
			this.provider = null

		//Indentificador de pagamento (Pode agragar em sí mais de uma transação)
			this.paymentId = null

		//Identificador da transação
			this.tid = null

		//Tipo de pagamento (Boleto, Cartão de crádito, etc..)
			this.type = null

		//Data do recebimento da transação (data em que o sistema registrou a autorização)
			this.receivedDate = null

		//Quantidade capturada
			this.capturedAmount = null

		//Data da captura
			this.capturedDate = null

		//Moeda
			this.currency = null

		//País
			this.country = null

		//Código retornado da transação TODO:(Consultar tabela da cielo)
			this.returnCode = null

		//Mensagem de retorno (ex: Operation Succesfull)
			this.returnMessage = null

		//Status da transação ()
			this.status = null

		//Objeto Links
			this.links = null
		/*
		"Links": [
			{
				"Method": "GET",
				"Rel": "self",
				"Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/e57b09eb-475b-44b6-ac71-01b9b82f2491"
			},
			{
				"Method": "PUT",
				"Rel": "capture",
				"Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/e57b09eb-475b-44b6-ac71-01b9b82f2491/capture"
			},
			{
				"Method": "PUT",
				"Rel": "void",
				"Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/e57b09eb-475b-44b6-ac71-01b9b82f2491/void"
			}
		]
		*/

		//Boleto
			this.url = null
			this.number = null
			this.barCodeNumber = null
			this.digitableLine = null
			this.address = null

		//Data de expiração do pagamento (Geralmente presento para Boletos)
			this.expirationDate = null
			this.boletoNumber = null
			this.assignor = null
			this.demonstrative = null
			this.identification = null
			this.instructions = null
	}
	static from(json)
	{
		if (validatePaymentJson(json))
		{
			return Object.assign(new Payment(), json)
		}
		else
		{
			return null
		}
		
	}
}
