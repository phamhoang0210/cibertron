class FrontComponent < ApplicationRecord
  # Define relations
  has_many :front_component_instances

  # Define constraints
  validates :name, presence: true

  class << self
    def compcond_columns
      [:id, :name, :title]
    end

    def include_entities
      {
        FrontComponentInstance => [:front_component_instances],
      }
    end
  end
end
