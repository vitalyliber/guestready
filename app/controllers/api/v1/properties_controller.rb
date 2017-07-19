class Api::V1::PropertiesController < ApplicationController

  def index
    @properties = Property.all

    render json: @properties, status: :ok
  end

  def create
    @property = Property.new(property_params)

    if @property.save
      render json: {id: @property.id}, status: :created
    else
      render json: {}, status: :bad_request
    end

  end

  private

  def property_params
    params.require(:property).permit(:name, :address, :bedrooms_number, :bathrooms_number, :size)
  end
end
