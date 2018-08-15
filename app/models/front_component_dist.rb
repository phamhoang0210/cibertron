class FrontComponentDist < ApplicationRecord
  # Define relations
  belongs_to :front_component_instance, optional: true

  # Define constraints
  validates :name, presence: true

  def is_css?
    !!(self.file_url =~ /.\.(css)$/)
  end

  def is_js?
    !!(self.file_url =~ /.\.(js)$/)
  end
end
