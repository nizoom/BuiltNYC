const getPermitData = require("./getPermitData");

const formatYear = require('./processrequestminifuncs/formatyear')

const formatJobType = require('./processrequestminifuncs/formatjob')

const formatPermitData = require('./processrequestminifuncs/formatpermitdata')

const getJobTotals = require('./dataforchartfuncs/jobtotals')

const getAllTimeTotals = require('./dataforchartfuncs/alltimetotals')


async function processRequest(job_type, year, borough) {

    //get year requested from front end 


    const formattedYears = formatYear(year)

    const formattedJobType = formatJobType(job_type)

    //borough has to be all caps for it to be API readable

    const formattedBorough = borough.toUpperCase();

    const rawPermitData = await getPermitData(formattedYears, formattedJobType, formattedBorough)

    const formattedPermitData = await formatPermitData(rawPermitData, borough)


    //AGGRAGATING GRAPH DATA

    //all construction type totals for a given year
    const permitTypeTotals = await getJobTotals(formattedYears, formattedBorough)

    const allTimeTotals = await getAllTimeTotals()


    //console.log(jobTypeTotals)
    //console.log(allTimeTotals)

    return [formattedPermitData, permitTypeTotals, allTimeTotals]


}

module.exports = processRequest;