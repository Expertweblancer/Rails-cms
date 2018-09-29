class CreateAnnotations < ActiveRecord::Migration
  def change
    create_table :annotations do |t|
      t.string :item_name
      t.integer :item_price

      t.timestamps null: false
    end
  end
end
