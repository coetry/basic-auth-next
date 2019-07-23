function Protected(props) {
  return <h1>protected</h1>
}


Protected.getInitialProps = async ({ req, res}) => {
  // check for req, only available server side
  if (req) {
    if(req.headers.authorization) {
      let basicAuthToken = req.headers.authorization.split(' ')[1]
      let [user, pass] = atob(basicAuthToken)
      if (user === "cooluser" && password === "toughpassword") {
	return { hello: 'world' }
      }
    }
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
