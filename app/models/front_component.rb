class FrontComponent < ApplicationRecord
  # Define relations
  has_many :front_component_instances

  # Define constraints
  validates :name, presence: true
end
