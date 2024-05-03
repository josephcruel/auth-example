const User = require('../../../models/user')

//GET /api/user/list

exports.list = (req, res) => {
    // Refuse if not an admin
    if (!req.decode.admin) {
        return res.status(403).json({
            message: 'You are not an admin'
        })
    }
}

User.find({}, '-password').exec()
    .then(
        users => {
            res.json({ users })
        }
    )

//POST /api/assign-admin/:username

exports.assignAdmin = (req, res) => {
    // Refuse if not an admin
    if (!req.decode.admin) {
        return res.status(403).json({
            message: 'You are not an admin'
        })
    }
    User.findOneByUsername(req.params.username)
        .then(
            user => {
                if(!user) throw new Error('User not found.')
                user.assignAdmin()
            }
        ).then(
            res.json({
                success: true
            })
        ).catch(
            (err) => { res.status(404).json({message: error.message})}
        )
}