require "application_system_test_case"

class PropertiesTest < ApplicationSystemTestCase
  test "visiting the index" do
    visit root_path

    assert_selector "p", text: "Number of properties: 2"
    assert_selector "p", text: "Average size of property: 75.00"
    # find('div[title="Business\ Title"]').click
  end

  test "creating the new" do
    address_of_property = "221B Baker Street London, United Kingdom"

    visit '/properties/new'

    fill_in "name", with: "House of Cherlock"
    fill_in "address", with: address_of_property
    within "#PlacesAutocomplete__autocomplete-container" do
      # first(:link).click
    end
    fill_in "bedrooms_number", with: "2"
    fill_in "bathrooms_number", with: "2"
    fill_in "size", with: "80"
    click_on "Submit"

    assert_text address_of_property
  end

  test "visitiong the show" do
    visit '/properties'

    assert_text "Baker Street house"
    assert_text "HongKong"
  end
end
