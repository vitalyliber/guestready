class Property < ApplicationRecord
  validates :name, :address, :bedrooms_number, :bathrooms_number, :size, presence: :true
  validates :bedrooms_number, :bathrooms_number, numericality: { greather_than: 1 }
end