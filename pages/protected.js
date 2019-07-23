function Protected() {
  return <h1>protected</h1>
}

Protected.getInitialProps = async ({ req, res}) => {
  res.writeHead(401, {
    'WWW-Authenticate': 'Basic'
  }).end()
  return {}
}

export default Protected
