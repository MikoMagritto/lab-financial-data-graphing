

document.getElementById('btn').addEventListener('click', () => {
    if(document.getElementById('startDate').value==='' && document.getElementById('endDate').value==='')
   { alert('enter your date'
   
   )}
   else{
   


    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${document.getElementById('startDate').value}&end=${document.getElementById('endDate').value}&currency=${document.getElementById('mySelect').value}`)
    .then(response => {
        printTheChart(response.data);
    })
    .catch(err => console.log(err))
}
 // closes printTheChart()
    
})

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
}
