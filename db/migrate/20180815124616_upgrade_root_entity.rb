class UpgradeRootEntity < ActiveRecord::Migration[5.1]
  def change
    remove_index :front_component_instances, name: "index_front_component_instances_on_code"
    add_index :front_component_instances, [:front_component_id, :code], unique: true

    remove_index :front_component_dists, name: "index_front_component_dists_on_name"
    add_index :front_component_dists, [:front_component_instance_id, :name], unique: true, name: "index_front_component_dists_on_name"
  end
end
