class CreateTickets < ActiveRecord::Migration
  def change
    create_table :tickets do |t|
      t.string :body
      t.integer :service
      t.string :ipaddress
      t.string :contact
      t.string :contact_phone
      t.integer :user_id
      t.integer :employee_id
      t.boolean :massive

      t.timestamps null: false
    end
  end
end
