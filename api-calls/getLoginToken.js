import * as nodeFetch from 'node-fetch'

const getLoginToken = async () => {
  const url = 'http://localhost:2221/api/login'
  const response = await nodeFetch(url, {
    method: 'POST',
    body: JSON.stringify({ username: 'admin', password: 'Admin123' }),
  })

  // Check in case the statuscode in NOT good (!= 200)
  if (response.status !== 200) {
    throw new Error('Error Occurreed: ' + response.status)
  }

  const body = await response.json()
  return body.token
}

export { getLoginToken }
