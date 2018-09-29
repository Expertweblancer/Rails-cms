class CreateInvestors < ActiveRecord::Migration
  def change
    create_table :investors do |t|

      t.timestamps null: false
    end
  end
end
