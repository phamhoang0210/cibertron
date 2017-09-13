class Api::V1::ServiceInfosController < Apiv1Controller
  def define_entity
    @entity_model = ServiceInfo
  end
  protected
    # Only allow a trusted parameter "white list" through.
    def entity_params
      params.require(:record).permit(:name, :code)
    end

    # Strong parameters for default search query
    def search_params
      params.permit(:id, :code, :name)
    end

    # Strong parameters for default advanced search query
    def advanced_search_params
      params.permit(:id)
    end
end
