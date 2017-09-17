module Userservice
  class DashboardController < UserserviceController
    # GET /userservice
    def index
      redirect_to '/userservice/accounts'
    end
  end
end