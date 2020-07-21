# -*- coding: utf-8 -*-

from cieloApi3 import *
from pathlib import Path
import json

merchantJSON = json.load(Path("./merchant.json").open())

environment = Environment(sandbox=True)

merchant = Merchant(merchantJSON['merchantId'], merchantJSON['merchantKey'])


cielo_ecommerce = CieloEcommerce(merchant, environment)


# Com o ID do pagamento, podemos fazer uma consulta do pagamento
response_get_sale = cielo_ecommerce.get_sale("d8ba6b5e-e2a6-4a57-96ac-292be7814d3a")
print '----------------------response_get_sale----------------------'
print json.dumps(response_get_sale, indent=2)
print '----------------------response_get_sale----------------------'

print '\r\nLink Boleto:', sale.payment.url, '\r\n'
