class AuthorityRelationsForServiceInfos < ActiveRecord::Migration[5.1]
  def change
    # Service infos
    add_column :service_infos, :company_id, :integer
    add_column :service_infos, :department_id, :integer
    add_column :service_infos, :user_id, :integer

    add_index :service_infos, :company_id
    add_index :service_infos, :department_id
    add_index :service_infos, :user_id
  end
end
