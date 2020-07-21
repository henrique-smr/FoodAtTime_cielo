import Cielo from "cielo";

const cieloOperation = {
	CREDIT:{
		CREATE:"CreditCreateRequest",
		CAPTURE:"CreditCaptureRequest",
		CANCEL:"CreditCancelRequest"
	},
	DEBIT:{
		CREATE:{
			SIMPLE:"DebitCreateSimpleRequest",
			COMPLETE:"DebitCreateCompleteRequest"
		},
	},
	ELETRONIC:{
		CREATE:"EletronicCreateRequest"
	},
	BANKSLIP:{
		CREATE:"BankslipCreateRequest"
	},
	CONSULT:{
		BY_MERCHANT_ORDER:"ConsultTransactionByMerchantOrderID",
		BY_PAYMENT:"ConsultTransactionByPaymentId",
		BY_CARDBIN:"ConsultTransactionByCardbin",
		BY_CARDTOKEN:"ConsultTransactionByCardtoken",
		RECURRENT:"ConsultRecurrentTransactionByRecurrentPaymentId"
	},
	RECURRENT:{
		CREATE:"RecurrentCreateRequest",
		MODIFY:{
			CUSTOMER:"RecurrentModifyCustomerRequest",
			END_DATE:"RecurrentModifyEndDateRequest",
			INTERVAL:"RecurrentModifyIntervalRequest",
			DAY:"RecurrentModifyDayRequest",
			AMOUNT:"RecurrentModifyAmountRequest",
			NEXT_DATE:"RecurrentModifyNextDateRequest",
			PAYMENT:"RecurrentModifyPaymentRequest"
		}

	}

}

function cieloOperationObject(merchant, requestId=null, sandbox=false, debug=true)
{
	return new Cielo.Cielo({
		merchantKey: merchant.merchantKey,
		merchantId: merchant.merchantId,
		requestId: requestId, // Opcional - Identificação do Servidor na Cielo
		sandbox: sandbox, // Opcional - Ambiente de Testes
		debug: debug // Opcional - Exibe os dados enviados na requisição para a Cielo
	});
}

function cieloPostSale(operation, sale){
	
	function onOperationSucces(data)
	{

	}

	const operationObject = cieloOperationObject(
		sale.merchant,
		null,
		true
	);
	switch(operation)
	{
		case cieloOperation.BANKSLIP.CREATE:
			operationObject.bankSlip.create(sale.json())
				.then((data)=>{
					console.log(data)
				})
				.catch((error)=>{
					console.log("Error ao submeter transação")
					console.log(error)
				})
	}
}

export {cieloOperation, cieloPostSale}