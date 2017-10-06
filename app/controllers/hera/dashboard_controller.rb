module Hera
  class DashboardController < HeraController
    # GET /hera
    def index
      redirect_to '/hera/landing_pages'
    end
  end
end