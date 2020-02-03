class Apiv1Controller < AuthController
  before_action :define_entity

  def define_entity
    send_json_error(['entity model is not defined'], :internal_server_error)
  end

  def core_index_filter(object)
    object = paging_standard(object)
  end

  #filter_json
  def filter_jsons
    {
      paging: {
        page: params[:page],
        per_page: params[:per_page],
        page_total: params[:page_total],
        record_total: params[:record_total],
        next: params[:page] < params[:page_total] ? (params[:page] + 1) : nil,
        prev: params[:page] > 1 ? (params[:page] - 1) : nil,

      },
      orders: params[:orders] || [],
      searches: params[:searches] || {},
      compconds: params[:compconds] || {},
      fields: params[:fields] || ''
    }
  end

  ### Begin setup of paging_standard. If not use will_paginate, write in mode class
  # Method validate page number (like page params)
  def validate_page(page, page_total)
    page.blank? || page <= 0 ? 1 : (page > page_total ? page_total : page)
  end

  # Return records as json
  def records_as_json(criterias, includes_deep_level = 2)
    options = {}
    
    criterias.as_json(options)
  end

  #page
  def paging_standard(intial)
    per_page = [Model::Pagination::DEFAULT_PER_PAGE, 1].max
    # paging standard
    record_total = intial.count
    per_page = record_total if params[:per_page] == Model::Pagination::INFINITE_PER_PAGE && record_total > 0
    page_total = (record_total.to_f / per_page).ceil
    page = validate_page(paging_params[:page].try(:to_i) || 1, page_total)
    page = [page, 1].max

    #set params
    params[:page] = page 
    params[:per_page] = per_page
    params[:page_total] = page_total
    params[:record_total] = record_total

    intial.paginate(page: page, per_page: per_page)
  end

  private

  ### Begin declare strong parameters
  def paging_params
    params.permit(:page, :per_page)
  end
end
