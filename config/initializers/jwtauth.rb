# Be sure to restart your server when you modify this file.

Jwtauth.setup do |config|
  # Read file contain public key used when decoding jwt.
  config.jwt_rsa_pub = OpenSSL::PKey::RSA.new(File.read('config/authservice_jwt.pub'))

  # Define authservice path for get session (jwt)
  config.session_path = (Rails.env.development? ? 'http://localhost:9000' : 'https://authservice.edumall.io') + '/api/v01/sessions'

  # Entity represent for current session
  # config.session_entity = User
end
