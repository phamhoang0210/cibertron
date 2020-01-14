class Apiv1Controller < AuthController
  include Pundit
  include Pureapi::Controller
  
  
  def define_entity
    send_json_error(['entity model is not defined'], :internal_server_error)
  end

  #filter_json
  def filter_jsons
    {
      paging: {
        page: 1,
        per_page: 20,
        page_total: 10,
        record_total: 1200,

      },
      orders: params[:orders] || [],
      searches: params[:searches] || {},
      compconds: params[:compconds] || {},
      fields: params[:fields] || ''
    }
  end
end
