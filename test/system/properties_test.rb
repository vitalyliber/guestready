require "application_system_test_case"

class PropertiesTest < ApplicationSystemTestCase
  test "visiting the index" do
    visit root_path

    assert_selector "p", text: "Number of properties: 2"
    assert_selector "p", text: "Average size of property: 75.00"
  end

  test "creating the new" do
    address_of_property = "221B Baker Street, London, United Kingdom"

    visit '/properties/new'

    fill_in "name", with: "House of Cherlock"
    fill_in "address", with: "ksjfksjdfkdskfjksdjfkj"

    # js validation with Google Maps
    click_on "Submit"
    assert_text "address is not valid"

    fill_in "address", with: address_of_property
    within "#PlacesAutocomplete__autocomplete-container" do
      find('div', text: address_of_property, match: :first).click
    end
    fill_in "bedrooms_number", with: "2"
    fill_in "bathrooms_number", with: "2"
    fill_in "size", with: "80"
    click_on "Submit"

    assert_text address_of_property
  end

  test "visiting the show" do
    visit '/properties'

    assert_text "Baker Street house"
    assert_text "HongKong"
  end
end
