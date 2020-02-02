class Api::V1::AccountsController < Apiv1Controller

  def define_entity
    @entity_model = Account
  end

	#Get api/v1/accounts
	def index
		 @records = core_index_filter(@entity_model)
		 
     render json: {filters: filter_jsons ,status:'SUCCESS', messages: 'Loaded Role', records: records_as_json(@records)}, status: :ok
	end

	#Get api/v1/acocunt/1
	def show
	end

	def new
	end
  
  #POST api/v1/account
	def create
	end

	#Update api/v1/id/update
	def update
	end

	def destroy
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
