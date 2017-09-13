module Userservice
  class DashboardController < UserserviceController
    # GET /userservice
    def index
      redirect_to '/userservice/users'
    end
  end
end