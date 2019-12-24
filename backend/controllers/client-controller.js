const Client = require('../models/client-model')

registerClient = (req, res) => {
    const body = req.body
    console.log('body',body)
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a info',
        })
    }

    const client = new Client(body)

    if (!client) {
        return res.status(400).json({ success: false, error: err })
    }

    client
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: client._id,
                message: 'Client created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Client not created!',
            })
        })
}

updateClient = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Client.findOne({ _id: req.params.id }, (err, client) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'client not found!',
            })
        }
        client.name = body.client_name
        client.address = body.address
        client.project_name = body.project_name
        client.project_brief=body.project_brief
        client.start_date=body.start_date
        client.deadline_date=body.deadline_date
        client.estimated_amount=body.estimated_amount
        client.status=body.status
        client.platform=body.platform
        client.languages=body.languages
        client
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: client._id,
                    message: 'client info updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Client Info not updated!',
                })
            })
    })
}

deleteClient = async (req, res) => {
    await Client.findOneAndDelete({ _id: req.params.id }, (err, client) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!client) {
            return res
                .status(404)
                .json({ success: false, error: `Client not found` })
        }

        return res.status(200).json({ success: true, data: client })
    }).catch(err => console.log(err))
}

getClientById = async (req, res) => {
    await Client.findOne({ _id: req.params.id }, (err, client) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!client) {
            return res
                .status(404)
                .json({ success: false, error: `client not found` })
        }
        return res.status(200).json({ success: true, data: client })
    }).catch(err => console.log(err))
}

getAllClient = async (req, res) => {
    await Client.find({}, (err, clients) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!clients.length) {
            return res
                .status(404)
                .json({ success: false, error: `No Clients Yet` })
        }
        return res.status(200).json({ success: true, clients })
    }).catch(err => console.log(err))
}

module.exports = {
    registerClient,
    updateClient,
    deleteClient,
    getClientById,
    getAllClient,
}