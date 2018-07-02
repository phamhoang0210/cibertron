class CreateFrontComponentDists < ActiveRecord::Migration[5.1]
  def change
    create_table :front_component_dists do |t|
      t.string :name
      t.string :file_url, limit: 2047
      t.integer :front_component_instance_id

      t.timestamps
    end

    add_index :front_component_dists, :name, unique: true
    add_index :front_component_dists, :front_component_instance_id
  end
end
