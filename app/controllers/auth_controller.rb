class AuthController < ApplicationController
  # GET /auth
  def index
  end

  # GET /auth/sign_in
  def sign_in
  end

  # GET /auth/sign_up
  def sign_up
  end

  # GET /auth/sign_out
  def sign_out
  end

  # def authorize record
  #   require_login
  # end

  def require_login
    unless require_login?
      render json: {errors:'You not loggin!'}
    end
  end

  #login
  def log_in user
    session[:user_id] = user.id
  end
  
  #logout
  def log_out
    session.delete :user_id
  end

  private

  def current_user
    @current_user ||= Account.find(session[:user_id]) if session[:user_id]
  end

  def require_login?
    current_user.present?
  end
end
