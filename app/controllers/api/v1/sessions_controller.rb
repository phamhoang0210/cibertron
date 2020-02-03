class Api::V1::SessionsController < Apiv1Controller
  skip_before_action :verify_authenticity_token
  def define_entity
    @entity_model = Account
  end

  def create
    user = @entity_model.find_by email: params[:email]
    if user && user.authenticate(params[:password])
      log_in user
      current_user
      render json: {status: 'Login Success'}
    else
      render json: {status: status, errors: 'Not Login'}
    end
  end

  def destroy
    log_out
    render json: {status: status, message: 'Logout success'}
  end
end
