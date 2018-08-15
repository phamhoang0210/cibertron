class FrontComponentInstance < ApplicationRecord
  # Define relations
  belongs_to :front_component, optional: true
  has_many :front_component_dists, dependent: :destroy

  # Define constraints
  validates :code, presence: true
  validates :code, uniqueness: { scope: :front_component_id }

  class << self
    def compcond_columns
      [:id, :name, :title]
    end

    def include_entities
      {
        FrontComponentDist => [:front_component_dists],
      }
    end
  end
end
