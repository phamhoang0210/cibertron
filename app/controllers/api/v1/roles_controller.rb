class Api::V1::RolesController < Apiv1Controller
  def index
    @record = Role.all

    render json: {filters: filter_jsons ,status:'SUCCESS', messages: 'Loaded Role', records: @record}, status: :ok
  end

  def show
    @record = Role.find_by(id: params[:id])

    render json: {status:'SUCCESS', messages: 'Loaded Show Role', data: @record}, status: :ok
  end

  def new
    @record = Role.new
  end

  def create
   @record = Role.new(entity_params)
   if @record.save
     render json: {status:'SUCCESS', messages: 'create role', data: @record}, status: :ok
   else
     render json: {status:'ERRORS', messages: 'create errors role', date:@record.errors}, status: :ok
   end
  end

  def destroy
     @record = Role.find(params[:id])
     @record.destroy
     render json: {status:'SUCCESS', messages: 'delete role', data: @record}, status: :ok
  end

  def update
    @record = Role.find(params[:id])
    if @record.update_attributes(entity_params)
      render json: {status:'SUCCESS', messages: 'update role', data: @record}, status: :ok
    else
      render json: {status:'ERRORS', messages: 'update role', data: @record.errors}, status: :unprocessable_entity
    end
  end

  protected

  def entity_params
    params.require(:record).permit(
      :name,
      :title,
      :description
    )
  end
end
