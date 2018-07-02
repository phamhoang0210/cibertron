class AppsController < ApplicationController
  layout false

  def index
    @app_css_antd ||= 'app-front-css-antd'
    @app_css ||= 'app-front-css'
    @app_js ||= 'app-front-js'
  end

  def namitl
    @app_css_antd = 'namitl-front-css-antd'
    @app_css = 'namitl-front-css'
    @app_js = 'namitl-front-js'

    render :index
  end
end
