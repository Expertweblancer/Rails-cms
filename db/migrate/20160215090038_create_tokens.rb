class CreateTokens < ActiveRecord::Migration
  def change
    create_table :tokens do |t|
      t.references :user, index: true, foreign_key: true
      t.string :token
      t.datetime :start_at
      t.datetime :end_at

      t.timestamps null: false
    end
  end
end
