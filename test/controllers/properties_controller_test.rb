require 'test_helper'

class Api::V1::PropertiesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get '/api/v1/properties'
    assert_equal(Property.all.to_json, response.body)
    assert_response :success
  end

  test "should search by name (trigram)" do
    get '/api/v1/properties?name=hon'
    assert_equal(Property.first.name, response.parsed_body.dig(0, 'name'))
    assert_response :success
  end

  test "should't search any properties" do
    get '/api/v1/properties?name=h'
    assert_equal([], response.parsed_body)
    assert_response :success
  end

  test "should create new property" do
    post '/api/v1/properties', params: {property:
                                            {
                                                name: 'House in Paris',
                                                address: 'Paris Marriott Opera Ambassador Hotel, Boulevard Haussmann, Paris, France',
                                                bedrooms_number: 1,
                                                bathrooms_number: 1,
                                                size: 45,
                                                lat: 48.8691729,
                                                lng: 2.3373316
                                            }
    }
    assert_equal({"id" => Property.last.id}, response.parsed_body)
    assert_response :success
  end

  test "should't create new property without lat and lng" do
    post '/api/v1/properties', params: {property:
                                            {
                                                name: 'House in Paris',
                                                address: 'Paris Marriott Opera Ambassador Hotel, Boulevard Haussmann, Paris, France',
                                                bedrooms_number: 1,
                                                bathrooms_number: 1,
                                                size: 45
                                            }
    }
    assert_equal({"errors"=>[{"attribute"=>"lat", "message"=>"can't be blank"}, {"attribute"=>"lng", "message"=>"can't be blank"}]},
                 response.parsed_body)
    assert_response :bad_request
  end
end
