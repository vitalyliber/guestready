class Api::V1::PropertiesController < ApplicationController

  protect_from_forgery prepend: true

  def index
    if params[:name].present?
      @properties = Property.search_by_name(params[:name]).limit(6)
    else
      @properties = Property.all.order(created_at: :desc)
    end

    render json: @properties, status: :ok
  end

  def create
    @property = Property.new(property_params)

    if @property.save
      render json: {id: @property.id}, status: :created
    else
      render json: {errors: @property.errors.map {|attribute, message| {attribute: attribute, message: message}} },
                    status: :bad_request
    end

  end

  private

  def property_params
    params.require(:property).permit(:name, :address, :bedrooms_number, :bathrooms_number, :size, :lat, :lng)
  end
end
