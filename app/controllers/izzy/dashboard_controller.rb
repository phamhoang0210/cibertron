module Izzy
  class DashboardController < IzzyController
    # GET /izzy
    def index
      redirect_to '/izzy/campaigns'
    end
  end
end