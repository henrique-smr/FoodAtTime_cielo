import {validateCustomerJson} from "./schema.js"


export default class Customer
{

	constructor(name, identity, identityType, birthDate)
	{
		this.name = name
		this.email = null
		this.birthDate = birthDate
		//Numero de identidade
		this.identity = identity
		//Tipo de identidade (CPF, RG)
		this.identityType = identityType
		this.address = null
		/*
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
      */
		this.deliveryAdress = null


	}

	static from(json)
	{

		if (validateCustomerJson(json))
		{
			return Object.assign(new Customer(), json)
		}
		else
		{
			return null
		}


	}
}