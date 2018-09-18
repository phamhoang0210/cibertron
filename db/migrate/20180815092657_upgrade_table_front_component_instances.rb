class UpgradeTableFrontComponentInstances < ActiveRecord::Migration[5.1]
  def change
    add_column :front_component_instances, :url_publish, :string, limit: 2047
  end
end
