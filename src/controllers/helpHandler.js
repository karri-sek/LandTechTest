const getHelpMessage = (req, res) => {
    const helpMessage = {
        message: `please provide valid customerID to get count of lands he owns example customer ID: C4012`,
        url: `http://localhost:5000/landRegistry?companyID=C4012` }
        res.json(helpMessage)
    }
export default getHelpMessage;