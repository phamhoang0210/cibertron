module Authservice
  class DashboardController < AuthserviceController
    # GET /authservice
    def index
      redirect_to '/authservice/accounts'
    end
  end
end