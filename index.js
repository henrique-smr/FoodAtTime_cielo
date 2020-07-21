//import Cielo from "cielo";
import {Custumer, Payment, Merchant, Sale} from "./cieloApi/index.js"
import {cieloOperation, cieloPostSale} from "./cieloApi/cielo.js"
//import {Customer} from "./cieloApi/customer.js";


const merchant = new Merchant('75459939-a67b-4dbf-95e5-e6766387c140','VAITVXOTTVJETBVSNQCYBVFFYOSHTSXHAUIZUPRX')


const customer = Custumer.from({
	name:"José da Silva",
	identity:"1234567890",
	birthDate:"1995-08-31",
	identityType:"CPF",
	address:{
		street: 'Avenida Marechal Câmara',
		number: '160',
		complement: 'Sala 934',
		zipCode: '22750012',
		district: 'Centro',
		city: 'Rio de Janeiro',
		state: 'RJ',
		country: 'BRA'
	}
})

const bill = Payment.from({
	type: 'Boleto',
	installments:1,
	authenticate:false,
	amount: 15700,
	provider: 'Bradesco2',
	address: 'Rua Teste',
	boletoNumber: '123',
	assignor: 'Empresa Teste',
	demonstrative: 'Desmonstrative Teste',
	expirationDate: '2020-05-01',
	identification: '11884926754',
	instructions: 'Aceitar somente até a data de vencimento, após essa data juros de 1% dia.'
})

const sale = new Sale(customer, bill, merchant)

cieloPostSale(cieloOperation.BANKSLIP.CREATE, sale)

/*

const cieloMerchantInfo = {
	merchantId: myMerchant.merchantId,
	merchantKey: myMerchant.merchantKey,
	requestId: '0000001', // Opcional - Identificação do Servidor na Cielo
	sandbox: true, // Opcional - Ambiente de Testes
	debug: true // Opcional - Exibe os dados enviados na requisição para a Cielo
};

const cieloHolder = new Cielo.Cielo(cieloMerchantInfo);

const boletoParams = {
		merchantOrderId: '20180531222333',
		customer: {
			name: 'Comprádor Boleto Cíéló Áá',
			identity: '1234567890',
			address: {
				street: 'Avenida Marechal Câmara',
				number: '160',
				complement: 'Sala 934',
				zipCode: '22750012',
				district: 'Centro',
				city: 'Rio de Janeiro',
				state: 'RJ',
				country: 'BRA'
			}
		},
		payment: {
			type: 'Boleto',
			installments:1,
			authenticate:false,
			amount: 15700,
			provider: 'Bradesco2',
			address: 'Rua Teste',
			boletoNumber: '123',
			assignor: 'Empresa Teste',
			demonstrative: 'Desmonstrative Teste',
			expirationDate: '2020-05-01',
			identification: '11884926754',
			instructions: 'Aceitar somente até a data de vencimento, após essa data juros de 1% dia.'
		}
	}

function onBoletoCreate(data)
{
	console.log(data)
}
function onConsulta(consulta)
{
	console.log(consulta)
}

cieloHolder.bankSlip.create(boletoParams)
	.then((data) => onBoletoCreate(data))
	.catch((error) => {
		console.log("ERROR ",error)
	})

cieloHolder.consult.merchantOrderId({"merchantOrderId":boletoParams.merchantOrderId})
	.then((consulta) => onConsulta(consulta))
	.catch((error) => {
		console.log("ERROR ",error)
	})

const sellParams = {
	customer: {
		name: "Comprador crédito",
	},
	merchantOrderId: "2014111703",
	payment: {
		amount: 10000, // R$100,00
		creditCard: {
			brand: EnumBrands.VISA,
			cardNumber: "4532117080573701",
			holder: "Comprador T Cielo",
			expirationDate: "12/2021",
		},
		installments: 1,
		softDescriptor: "FAT",
		type: EnumCardType.CREDIT,
		capture: false,
	},
};
*/


//foodattime-1595290302345