module Userservice
  class DashboardController < UserserviceController
    # GET /users
    def index
      redirect_to '/userservice/users'
    end
  end
end