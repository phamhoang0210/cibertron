class Api::V1::RolesController < Apiv1Controller
  skip_before_action :authorize_user!, only: [:index]

  def define_entity
    @entity_model = Role
  end

  def index
    @records = core_index_filter(@entity_model)

    render json: { filters: filter_jsons, records: records_as_json(@records) }
  end

  protected
  # Only allow a trusted parameter "white list" through.
  def entity_params
    params.require(:record).permit(:name)
  end

  # Strong parameters for default search query
  def search_params
    params.permit(:id, :name)
  end

  # Strong parameters for default advanced search query
  def advanced_search_params
    params.permit(:id)
  end
end
