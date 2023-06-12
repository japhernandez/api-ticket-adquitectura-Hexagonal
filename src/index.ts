import app from "./app";
import db from "./infrastructure/database/connection";

const main = async () => {
    try {
        await db.sync({ force: false })
        app.listen(app.get('port'), () => {
            console.log(`http://localhost:${app.get("port")}/api-v1-docs`)
        })
    } catch (err) {
        console.error(err)
    }
}

main()