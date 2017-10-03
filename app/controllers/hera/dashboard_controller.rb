module Hera
  class DashboardController < HeraController
    # GET /hera
    def index
      redirect_to '/hera/landingpages'
    end
  end
end