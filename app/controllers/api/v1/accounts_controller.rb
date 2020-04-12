class Api::V1::AccountsController < Apiv1Controller
  # skip_before_action :verify_authenticity_token
  before_action :authenticate
  
  def define_entity
    @entity_model = Account
  end

	#Get api/v1/accounts
	def index
		 @records = core_index_filter(@entity_model)
		 
     render json: {filters: filter_jsons ,status:'SUCCESS', messages: 'Loaded Role', records: records_as_json(@records)}, status: :ok
	end

  def show
    @record = @entity_model.find_by(id: params[:id])

    render json: records_as_json(@record)
  end
  
  
  def create
    @record = @entity_model.new(entity_params)

    if @record.save
      render json: records_as_json(@record), status: :created
    else
      render json: @record.errors, status: :failse
    end
  end
  
  # DELETE /api/v01/entity_names(s)/1
  def destroy
     @record = @entity_model.find(params[:id])

     @record.destroy
  end
  
  # PATCH/PUT /api/v01/entity_names(s)/1
  def update
    @record = @entity_model.find(params[:id])

    if @record.update_attributes(entity_params)
      render json: {status:'SUCCESS', messages: 'update', record: @record}, status: :ok
    else
      render json: {status:'ERRORS', messages: 'update role', data: @record.errors}, status: :unprocessable_entity
    end
  end

	protected

	def entity_params
		params.require(:record).permit(
      :name,
      :email,
      :role_id,
      :password,
      :password_confirmation
    )
	end
end
