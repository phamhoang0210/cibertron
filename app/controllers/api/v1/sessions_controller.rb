class Api::V1::SessionsController < Apiv1Controller
  skip_before_action :verify_authenticity_token, only: [:new, :create, :signout]
  def define_entity
    @entity_model = Account
  end

  def create
    user = @entity_model.find_by email: params[:email]
    if user && user.authenticate(params[:password])
      log_in user
      current_user
    else
      render json: {errors: 'Not Login'}, status: :unauthorized
    end
  end

  def signout
    log_out
    render json: {message: 'SignOut success'}, status: :ok
  end
end
