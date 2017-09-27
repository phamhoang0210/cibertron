module Nauh
  class DashboardController < NauhController
    # GET /nauh
    def index
      redirect_to '/nauh/leads'
    end
  end
end