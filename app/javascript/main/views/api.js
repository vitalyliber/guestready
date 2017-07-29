import axios from 'axios'
import isEmpty from 'is-empty'

export const fetchProperties = (name, before, after) => {
  before()

  let search_name = isEmpty(name) ? '' : `?name=${name}`

  axios.get(`/api/v1/properties${search_name}`)
    .then(function (response) {
      console.log(response)
      after(response.data)
    })
    .catch(function (error) {
      console.log(error.response.status)
    })
}