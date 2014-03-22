$(function () {
        $('#result_graph').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: results.title
            },
            subtitle: {
                text: 'Poller Bears'
            },
            xAxis: {
                categories: ['1', '2', '3', '4', '5'],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Poll Answers',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' '
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor: '#FFFFFF',
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Answer 1',
                data: [results["0"]["1"], results["0"]["2"], results["0"]["3"], results["0"]["4"], results["0"]["5"]]
            }, {
                name: 'Answer 2',
                data: [results["1"]["1"], results["1"]["2"], results["1"]["3"], results["1"]["4"], results["1"]["5"]]
            }, {
                name: 'Answer 3',
                data: [results["2"]["1"], results["2"]["2"], results["2"]["3"], results["2"]["4"], results["2"]["5"]]
            }, {
                name: 'Answer 4',
                data: [results["3"]["1"], results["3"]["2"], results["3"]["3"], results["3"]["4"], results["3"]["5"]]
            }, {
                name: 'Answer 5',
                data: [results["4"]["1"], results["4"]["2"], results["4"]["3"], results["4"]["4"], results["4"]["5"]]
            }]
        });
    });