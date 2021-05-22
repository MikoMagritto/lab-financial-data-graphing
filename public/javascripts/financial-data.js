
axios.get("http://api.coindesk.com/v1/bpi/historical/close.json")
    .then(response => {
        printTheChart(response.data);
    })
    .catch(err => console.log(err))

function printTheChart(stockData) {
    const dailyData = stockData['Time Series (Daily)'];

    const stockDates = Object.keys(dailyData);
    const stockPrices = stockDates.map(date => dailyData[date]['4. close']);

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