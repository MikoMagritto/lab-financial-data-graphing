
// const start = document.querySelector("input[name='start']");
// console.log(start);
// const end = document.querySelector("input[name='end']");
// console.log(end);

const { response } = require("express")

document.getElementById('btn').addEventListener('click', () => {
    const start = document.getElementById('startDate').value
    const end = document.getElementById('endDate').value
    console.log("date", start, end)
})

// start.onclick = function () {
//     console.log(start.value)
// }

axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
    .then(response => {
        printTheChart(response.data);
    })
    .catch(err => console.log(err))

function printTheChart(stockData) {

    const dailyData = stockData["bpi"];

    const stockDates = Object.keys(dailyData);
    const stockPrices = stockDates.map(date => dailyData[date]);

    const ctx = document.getElementById('my-chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: stockDates,
            datasets: [
                {
                    label: 'Stock Chart',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: stockPrices
                }
            ]
        }
    }); // closes chart = new Chart()
} // closes printTheChart()

function filter(start, end) {
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
        .then(responseFromApi => {
            const dailyData = responseFromApi.data.bpi
            const stockDates = Object.keys(dailyData);
            const stockPrices = stockDates.map(date => dailyData[date]);
            printTheChart(stockDates, stockPrices)

        })

}
