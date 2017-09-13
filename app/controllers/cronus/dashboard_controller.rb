module Cronus
  class DashboardController < CronusController
    # GET /cronus
    def index
      redirect_to '/cronus/channels'
    end
  end
end