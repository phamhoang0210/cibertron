module Ees
  class DashboardController < EesController
    # GET /ees
    def index
      redirect_to '/ees/campaigns'
    end
  end
end