class AppsController < ApplicationController
  layout false

  def index
    @app_css_antd ||= 'app-front-css-antd'
    @app_css ||= 'app-front-css'
    @app_js ||= 'app-front-js'
  end

  def nami
    @app_css_antd = 'nami-front-css-antd'
    @app_css = 'nami-front-css'
    @app_js = 'nami-front-js'

    render :index
  end

  def myaccount
    @app_css_antd = 'myaccount-front-css-antd'
    @app_css = 'myaccount-front-css'
    @app_js = 'myaccount-front-js'

    render :index
  end

  def business
    @app_css_antd = 'business-front-css-antd'
    @app_css = 'business-front-css'
    @app_js = 'business-front-js'

    render :index
  end
end
