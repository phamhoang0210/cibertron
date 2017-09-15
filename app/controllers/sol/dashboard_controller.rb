module Sol
  class DashboardController < SolController
    # GET /cronus
    def index
      redirect_to '/sol/promos'
    end
  end
end