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

/* RESPOSTA:
{
  merchantOrderId: '202072119',
  customer: {
    name: 'Jose da Silva',
    identity: '1234567890',
    identityType: 'CPF',
    birthdate: '1995-08-31',
    address: {
      street: 'Avenida Marechal Camara',
      number: '160',
      complement: 'Sala 934',
      zipCode: '22750012',
      city: 'Rio de Janeiro',
      state: 'RJ',
      country: 'BRA',
      district: 'Centro'
    }
  },
  payment: {
    instructions: 'Aceitar somente ate a data de vencimento, apos essa data juros de 1% dia.',
    expirationDate: '2020-05-01',
    demonstrative: 'Desmonstrative Teste',
    url: 'https://transactionsandbox.pagador.com.br/post/pagador/reenvia.asp/2d33a113-0c4d-49a2-a13e-4c374dbb5c05',
    boletoNumber: '123-2',
    barCodeNumber: '00095824200000157009999250000000012399999990',
    digitableLine: '00099.99921 50000.000013 23999.999909 5 82420000015700',
    assignor: 'Empresa Teste',
    address: 'Rua Teste',
    identification: '11884926754',
    bank: 0,
    amount: 15700,
    receivedDate: '2020-07-21 19:51:47',
    provider: 'Simulado',
    status: 1,
    isSplitted: false,
    paymentId: '2d33a113-0c4d-49a2-a13e-4c374dbb5c05',
    type: 'Boleto',
    currency: 'BRL',
    country: 'BRA',
    links: [ [Object] ]
  }
}

*/