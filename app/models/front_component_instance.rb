class FrontComponentInstance < ApplicationRecord
  # Define relations
  belongs_to :front_component, optional: true
  has_many :front_component_dist

  # Define constraints
  validates :code, presence: true
end
