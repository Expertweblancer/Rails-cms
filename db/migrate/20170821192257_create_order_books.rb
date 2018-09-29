class CreateOrderBooks < ActiveRecord::Migration
  def change
    create_table :order_books do |t|
      t.string :name
      t.integer :trade_principal
      t.string :security
      t.integer :security_price
      t.decimal :shares, precision:10, scale:2
      t.integer :security_principal
      t.integer :elmhurst_principal
      t.integer :profit_loss
      t.string :receipient

      t.timestamps null: false
    end
  end
end
