class AddLatLngToProperty < ActiveRecord::Migration[5.1]
  def change
    add_column :properties, :lat, :float
    add_column :properties, :lng, :float
  end
end
