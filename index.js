// generate a pair of keys
const privateKey = '5J6nUV6mpFsggk24aohRaiAsfVKShMf2MsqKWGNJ7JtoqgyHGwK'
const publicKey = EVT.EvtKey.privateToPublic(privateKey)

const run = async () => {
  console.log('Public Key:', publicKey)
  // set network endpoint
  const network = {
    host: 'testnet1.everitoken.io', // For everiToken TestNet (See all the networks on https://www.everitoken.io/networks)
    port: 443, // defaults to 443
    protocol: 'https', // the TestNet of everiToken uses http and the MainNet uses https
  }

  // get APICaller instance
  const apiCaller = EVT({
    endpoint: network,
    keyProvider: [privateKey], // The private key provider. Here we use the private key directly. You can also pass indirect value to increse security. See the documentation below (`initialization` block of `ApiCaller` class) for detail.
  })

  // call API
  var response = await apiCaller.getInfo()

  // or if `await` is NOT supported in current environment
  apiCaller
    .getInfo()
    .then(res => {
      console.log('Node info', res)
    })
    .catch(e => {
      // Handle error
    })

  // get balance of all fungible tokens (for example: EVT Token)
  // parameter: public key
  let balances = await apiCaller.getFungibleBalance(publicKey)
  console.log('Balance of %s is %s', publicKey, balances)

  // transfer fungible tokens to others
  let trx = await apiCaller.pushTransaction(
    { maxCharge: 100000 }, // limit of the transaction fee
    new EVT.EvtAction('transferft', {
      from: publicKey, // sender
      to: 'EVT6Qz3wuRjyN6gaU3P3XRxpnEZnM4oPxortemaWDwFRvsv2FxgND', // receiver
      number: '0.10000 S#1', // S#1 means the No 1 fungible token (EVT token)
      memo: 'Test', // Comment or extra data
    })
  )

  console.log('Transaction id:', trx)
}

document.getElementById('btn').addEventListener(
  'click',
run,
  false
)
