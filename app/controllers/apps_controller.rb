class AppsController < ApplicationController
  layout false

  def index
    @app_css_antd ||= 'bnode-front-css-antd'
    @app_css ||= 'bnode-front-css'
    @app_js ||= 'bnode-front-js'
  end

  def namitl
    @app_css_antd = 'bnode-front-css-antd'
    @app_css = 'bnode-front-css'
    @app_js = 'bnode-front-js'

    render :index
  end
end
