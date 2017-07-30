class Property < ApplicationRecord
  include PgSearch
  pg_search_scope :search_by_name,
                  :against => :name,
                  :using => [:tsearch, :trigram, :dmetaphone]

  validates :name, :address, :bedrooms_number, :bathrooms_number, :size, :lat, :lng, presence: :true
  validates :bedrooms_number, :bathrooms_number, numericality: { greather_than: 1 }
end