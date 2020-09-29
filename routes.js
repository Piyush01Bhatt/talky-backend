import { userRouter } from './routers/user.js'
import { friendsRouter } from './routers/friends.js'

// api routes
const appRoutes = (app) => {
    /** default route */
    app.get('/', (req, res) => {
        console.log('/ route')
        return res.status(200).send("welcome to talky")
    })

    /** login,register and auth route */
    app.use("/user", userRouter)

    /** friend routes */
    friendsRouter.use((req, res, next) => {
        res.io = io;
        next();
    })

    app.use("/friends", friendsRouter)
}

/** exporting app */
export default appRoutes;