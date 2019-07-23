function Protected() {
  return <h1>protected</h1>
}


Protected.getInitialProps = async ({ req, res}) => {
  // check for req, only available server side
  if (req) {
    const authHeader = req.headers['authorization']
    const basicAuthToken = authHeader.split(' ')[1]
    console.log('basic auth token', basicAuthToken)
  }

  // check for res, only available server side
  if (res) {
    res.writeHead(401, {
      'WWW-Authenticate': 'Basic realm=private page'
    })

    res.end('unauthorized')
  }
  return {}
}

export default Protected
