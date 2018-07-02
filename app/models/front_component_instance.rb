class FrontComponentInstance < ApplicationRecord
  # Define relations
  belongs_to :front_component
  has_many :front_component_dist

  # Define constraints
  validates :code, presence: true
end
