function Protected() {
  return <h1>protected</h1>
}

Protected.getInitialProps = async ({ req, res}) => {
  res.writeHead(401, {
    'WWW-Authenticate': 'Basic realm=private page'
  }).end('unauthorized')
  return {}
}

export default Protected
