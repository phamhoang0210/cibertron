module Cronus
  class DashboardController < CronusController
    # GET /cronus
    def index
      redirect_to '/cronus/campaigns'
    end
  end
end