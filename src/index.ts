import app from "./app";
import db from "./infrastructure/database/connection";

const main = async () => {
    try {
        await db.sync({ force: true })
        app.listen(app.get('port'), () => {
            console.log(`http://localhost:${app.get("port")}/`)
        })
    } catch (err) {
        console.error(err)
    }
}

main()