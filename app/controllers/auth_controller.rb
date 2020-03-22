require 'jwt'
# class AuthController
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

  def authenticate
    require_login
  end

  def require_login
    unless require_login?
      render json: {errors:'You not loggin!'}
    end
  end

  #login
  def log_in user
    session[:user_id] = user.id
    current_user

    ## call intance create token
    create_token(user)
  end
  
  #logout
  def log_out
    session.delete :user_id
  end

  #############CREATE TOKEN###########################
    #create token
  def create_token(user, token: nil, expiry: nil)

    hmac_secret = Base64.decode64('A9DtZHh3LDvCeKwnpG34')

    expiry ||= (Time.zone.now + token_lifespan).to_i

    uid = user.email.to_s if user.present?

    payload = {
      sub: uid,
      iat: Time.now.to_i,
      exp: expiry
    }

    token = JWT.encode payload, hmac_secret, 'HS512'

    data_token = {
      'access-token' => token,
      'uid'          => uid,
      'expiry'       => expiry
    }

    # careate new token in account
    create_new_token(data_token);

    return render json: data_token, status: :ok
  end

  def create_new_token(data)
    account = Account.find_by(:email => data["uid"])

    if account
      account.tokens = data;
      account.save
    else
      p "Create token errors! #{self}"
    end
  end

  #get token_lifespan from gem devise_token_auth
  def token_lifespan
    return 2.week
  end
  ################ END TOKEN ##############################


  private

  def current_user
    @current_user ||= Account.find(session[:user_id]) if session[:user_id]
  end

  def require_login?
    current_user.present?
  end
end
