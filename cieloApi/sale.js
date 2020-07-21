import generateOrderId from './utils.js'

export default class Sale{
	constructor(customer,payment, merchant,merchantOrderId)
	{
		this.customer = customer
		this.payment = payment
		this.merchant=merchant
		//this.merchantId = merchant.merchantId
		//this.merchantKey = merchant.merchantKey
		if (!merchantOrderId == null)
		{
			this.merchantOrderId = merchantOrderId
		}
		else
		{
			this.merchantOrderId = generateOrderId()
		}
	}

	json()
	{
		return {
			"customer":this.customer,
			"payment":this.payment,
			"merchantOrderId":this.merchantOrderId
		}
	}
}