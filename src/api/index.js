import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
})

export const registerClient = payload => api.post(`/registerClient`, payload)
export const getAllClient = () => api.get(`/clients`)
export const updateClientById = (id, payload) => api.put(`/client/${id}`, payload)
export const deleteClientById = id => api.delete(`/client/${id}`)
export const getClientById = id => api.get(`/client/${id}`)

const apis = {
    registerClient,
    getAllClient,
    updateClientById,
    deleteClientById,
    getClientById,
}

export default apis