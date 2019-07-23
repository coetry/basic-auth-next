function Protected(props) {
  return <h1>protected</h1>
}


Protected.getInitialProps = async ({ req, res}) => {
  // check for req, only available server side
  if (req) {
    if(req.headers.authorization) {
      // dynamically require atob module for server side node
      const atob = require('atob')
      let basicAuthToken = req.headers.authorization.split(' ')[1]
      let [user, pass] = atob(basicAuthToken)
      if (user === "cooluser" && password === "toughpassword") {
	return { hello: 'world' }
      }
    } else {
      res.writeHead(401, {
      'WWW-Authenticate': 'Basic realm=private page'
      })
      res.end('unauthorized')
      return {}
    }
  }
}

export default Protected
