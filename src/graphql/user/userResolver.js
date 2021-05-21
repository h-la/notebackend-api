const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { UserInputError } = require('apollo-server')
const User = require('../../models/user.js')

const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
    Query: {
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Mutation: {
        createUser: async (root, args) => {
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(args.password, saltRounds)
            const user = new User({ username: args.username, passwordHash: passwordHash })

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            const passwordCorrect = user === null
                ? false
                : await bcrypt.compare(args.password, user.passwordHash)

            if (!(user && passwordCorrect)) {
                throw new UserInputError("wrong credentials")
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        },
    },
}
