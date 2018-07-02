class FrontComponentDist < ApplicationRecord
  # Define relations
  belongs_to :front_component_instance

  # Define constraints
  validates :name, presence: true
end
