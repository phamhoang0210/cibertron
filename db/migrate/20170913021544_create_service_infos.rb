class CreateServiceInfos < ActiveRecord::Migration[5.1]
  def change
    create_table :service_infos do |t|
      t.string :name
      t.string :internal_name
      t.string :avatar_url
      t.text :description
      t.string :link
      t.timestamps
    end
  end
end
