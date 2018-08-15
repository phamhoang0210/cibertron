class AppsController < ApplicationController
  layout false

  def index
    @app = FrontComponentInstance.find_by!(code: params[:code])
    @dists = @app.front_component_dists.order(:name)
  end

  def myaccount
    @app_css_antd = 'myaccount-front-css-antd'
    @app_css = 'myaccount-front-css'
    @app_js = 'myaccount-front-js'
  end
end
