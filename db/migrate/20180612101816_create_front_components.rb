class CreateFrontComponents < ActiveRecord::Migration[5.1]
  def change
    create_table :front_components do |t|
      t.string :name, limit: 63
      t.string :title
      t.string :source_code, limit: 2047
      t.string :description, limit: 2047

      t.timestamps
    end
    add_index :front_components, :name, unique: true
  end
end
