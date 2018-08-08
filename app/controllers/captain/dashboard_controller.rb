module Captain
  class DashboardController < CaptainController
    # GET /cronus
    def index
      redirect_to '/captain/campaigns'
    end
  end
end