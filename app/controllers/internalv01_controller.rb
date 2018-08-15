class Internalv01Controller < ApplicationController
  include Pureapi::Controller

  # Define entity model before action
  before_action :define_entity
  before_action :set_entity, only: [:show, :update, :destroy]

  # Require define entity class name
  def define_entity
    send_json_error(['entity model is not defined'], :internal_server_error)
  end

  # Send error messages with status
  def send_json_error(errors = [], status = :unprocessable_entity)
    render json: errors, status: status
  end

  # GET /api/v01/entity_name(s)
  def index
    #@records = standard_index_filter(policy_scope(@entity_model))
    @records = core_index_filter(@entity_model)

    # render json: { filters: filter_jsons, records: records_as_json(@records) }
    render json: records_as_json(@records)
  end

  # GET /api/v01/entity_names(s)/1
  def show
    #authorize @record

    render json: record_as_json(@record)
  end

  # POST /api/v01/entity_names(s)
  def create
    @record = @entity_model.new(entity_params)
    #authorize @record

    if @record.save
      render json: record_as_json(@record), status: :created
    else
      render json: @record.errors.full_messages, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v01/entity_names(s)/1
  def update
    @record.assign_attributes(entity_params)
    #authorize @record

    if @record.save
      render json: record_as_json(@record), status: :ok
    else
      render json: @record.errors.full_messages, status: :unprocessable_entity
    end
  end

  # DELETE /api/v01/entity_names(s)/1
  def destroy
    #authorize @record

    @record.destroy
  end

  protected
    # Use callbacks to share common setup or constraints between actions.
    def set_entity
      @record = @entity_model.find_by!(gid: params[:id])
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
