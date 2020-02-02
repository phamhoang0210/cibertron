module Model
  module Pagination
    DEFAULT_PER_PAGE = 10
    INFINITE_PER_PAGE = 'infinite'.freeze
  end

  def paginate(params)
    self.limit(params[:per_page]).offset((params[:page] - 1) * params[:per_page])
  end
end