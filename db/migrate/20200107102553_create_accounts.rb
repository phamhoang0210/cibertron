class CreateAccounts < ActiveRecord::Migration[5.1]
  def change
    create_table :accounts do |t|
      t.string :name, limit:83
      t.string :email
      t.references :role, foreign_key: true
      t.string :password_digest

      t.timestamps
    end

    add_index :accounts, :email, unique: true
  end
end
