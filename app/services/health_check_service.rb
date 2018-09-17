class HealthCheckService
  class << self
    def perform_check
      ""
    end

    def perform_check_auth
      uri = URI(ENV['AUTHSERVICE_BASE_URL'] + '/api/v01/sessions/validate_rsa_pub')

      uri.query = CGI.unescape({
        'jwt_rsa_pub' => Digest::SHA1.hexdigest(Jwtauth.jwt_rsa_pub.to_s),
      }.to_query)

      Net::HTTP.start(uri.host, uri.port,
        :use_ssl => uri.scheme == 'https') do |http|
        request = Net::HTTP::Get.new uri

        response = http.request request

        case response
        when Net::HTTPSuccess then
          ""
        else
          response.value
        end
      end
    end

    def perform_another_check
      ""
    end
  end
end
