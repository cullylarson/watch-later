import front from 'server/layouts/front'

export default {
    index(req, res) {
        res.send(front('asdf'))
    },
}
