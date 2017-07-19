class CreateProperties < ActiveRecord::Migration[5.1]
  def change
    create_table :properties do |t|
      t.string :name
      t.string :address
      t.integer :bedrooms_number
      t.integer :bathrooms_number
      t.float :size

      t.timestamps
    end
  end
end
