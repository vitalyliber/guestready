require 'test_helper'

class PropertiesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get '/api/v1/properties'
    assert_response :success
  end

end
