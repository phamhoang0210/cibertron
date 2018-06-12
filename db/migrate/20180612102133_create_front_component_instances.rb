class CreateFrontComponentInstances < ActiveRecord::Migration[5.1]
  def change
    create_table :front_component_instances do |t|
      t.string :code, limit: 63
      t.string :status_gid, limit: 63
      t.string :version
      t.string :scope_gid, limit: 63
      t.integer :front_component_id

      t.timestamps
    end

    add_index :front_component_instances, :code, unique: true
    add_index :front_component_instances, :front_component_id
  end
end
