class Apiv1Controller < ApplicationController
  include Pureapi::Controller
  include Jwtauth::Controller

  # Define entity model before action
  before_action :authorize_user!
  before_action :define_entity
  before_action :set_entity, only: [:show, :update, :destroy]

  def define_entity
    @entity_model = User
  end

  # GET /api/v02/entity_name(s)
  def index
    # @records = standard_index_filter(policy_scope(@entity_model))
    @records = standard_index_filter(@entity_model)

    render json: { filters: filter_jsons, records: records_json(@records) }
  end

  # GET /api/v02/entity_names(s)/1
  def show
    # authorize @record

    render json: record_json(@record)
  end

  # POST /api/v02/entity_names(s)
  def create
    @record = @entity_model.new(entity_params)
    # authorize @record

    if @record.save
      render json: record_json(@record), status: :created
    else
      render json: @record.errors.full_messages, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v02/entity_names(s)/1
  def update
    @record.assign_attributes(entity_params)
    # authorize @record

    if @record.save
      render json: record_json(@record), status: :ok
    else
      render json: @record.errors.full_messages, status: :unprocessable_entity
    end
  end

  # DELETE /api/v02/entity_names(s)/1
  def destroy
    # authorize @record

    @record.destroy
  end

  protected
    # Use callbacks to share common setup or constraints between actions.
    def set_entity
      @record = @entity_model.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def entity_params
      params.require(:record).permit(:created_at)
    end

    # Strong parameters for default search query
    def search_params
      params.permit(:id)
    end

    # Strong parameters for default advanced search query
    def advanced_search_params
      params.permit(:created_at)
    end
end
