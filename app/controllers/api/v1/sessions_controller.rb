class Api::V1::SessionsController < Apiv1Controller
  skip_before_action :verify_authenticity_token
  def define_entity
    @entity_model = Account
  end

  def create
    user = @entity_model.find_by email: params[:email]
    if user && user.authenticate(params[:password])
      log_in user
    else
      render json: {errors: 'Not Login'}, status: :unauthorized
    end
  end

  def destroy
    log_out
    render json: {message: 'Logout success'}, status: :ok
  end
end
