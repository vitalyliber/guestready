import axios from 'axios'
import isEmpty from 'is-empty'

export const fetchProperties = (name, before, after) => {
  before()

  let search_name = isEmpty(name) ? '' : `?name=${name}`

  axios.get(`/api/v1/properties${search_name}`)
    .then(function (response) {
      after(response.data)
    })
    .catch(function (error) {
      console.log(error.response.status)
    })
}

export const createProperty = (params, before, after, error) => {
  before()

  axios.post(`/api/v1/properties`, params)
    .then(function (response) {
      after()
    }.bind(this))
    .catch(function (error) {
      error()
    }.bind(this))
}