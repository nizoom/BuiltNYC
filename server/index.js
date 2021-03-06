require('dotenv').config()

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const processRequest = require('./processrequest')


app.get("/borough/:boroughName/type/:job_type/timeSpan/:year", async (req, res) => {

    let { boroughName, job_type, year } = req.params;


    console.log(boroughName)

    const determineBoroughName = boroughName => { //API only takes "Bronx" not "The Bronx"
        if (boroughName === "The Bronx") {
            return "Bronx"
        }
        return boroughName
    }

    const formattedBorughName = determineBoroughName(boroughName)

    const formattedPermitDataAndTotals = await processRequest(job_type, year, formattedBorughName)

    const [formattedPermitData, permitTotals, allTimeTotals] = formattedPermitDataAndTotals

    //res.send("Hello from backend")

    res.send({ allData: [formattedPermitData, permitTotals, allTimeTotals] })

});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});