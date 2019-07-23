function Protected(props) {
  return <h1>protected</h1>
}


Protected.getInitialProps = async ({ req, res}) => {
  // check for req, only available server side
  let props = {}
  if (req) {
    if(req.headers.authorization) {
      // dynamically require atob module for server side node
      const atob = require('atob')
      let basicAuthToken = req.headers.authorization.split(' ')[1]
      console.log('basic auth token', basicAuthToken)
      let [user, pass] = atob(basicAuthToken).split(':')
      console.log('user:', user)
      console.log('pass:', pass)
      if (user === "cooluser" && pass === "toughpassword") {
	props = { hello: 'world' }
	return props
      } else {
	res.writeHead(401, {
	  'WWW-Authenticate': 'Basic realm=private page'
	})
	res.end('unauthorized')
	return props
      }
    } else {
      res.writeHead(401, {
      'WWW-Authenticate': 'Basic realm=private page'
      })
      res.end('unauthorized')
      return props
    }
  }
  return props
}

export default Protected
