# Be sure to restart your server when you modify this file.

Jwtauth.setup do |config|
  # Read file contain public key used when decoding jwt.
  config.jwt_rsa_pub = OpenSSL::PKey::RSA.new(File.read('config/authservice_jwt.pub'))

  # Define authservice path for get session (jwt)
  config.session_path = ENV['AUTHSERVICE_BASE_URL'] + '/api/v01/sessions'

  # Entity represent for current session
  # config.session_entity = User

  # Define current service (String) contain entities
  config.service_name = 'gaia'

  # Define namespace (String | Array) include +current service+ for service
  config.namespace = 'gaia'
end
