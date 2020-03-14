class Users < ActiveRecord::Migration[5.2]
  def change
    create_table :users, force: :cascade do |t|
      t.string "email"
    end

    create_table :places, force: :cascade do |t|
      t.string "name"
      t.decimal "latitude", null: false
      t.decimal "longitude", null: false
    end
    end
end
