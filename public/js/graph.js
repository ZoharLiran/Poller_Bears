$(function () {
        var size = function(results)
        {
            var count = 0;
            for(var prop in results)
            {
                count++;
            }
            return count;
        }
        var numOfQuestions = size(results);
        debugger
        categories = []
        for (var i = 1; i <= numOfQuestions; i++)
        {
            categories.push(i)
        }

        var series = []
        var numOfAnswers = results[0].length;
        for (var i=0; i<numOfAnswers; i++)
        {
            series[i] = {name:"Answer "+(i+1)}
            series[i].data = []
            for (var j=0; j<numOfQuestions; j++)
            {
                series[i].data.push(results[j][i]) 
            }
        }
        $('#result_graph').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: title
            },
            subtitle: {
                text: 'Poller Bears'
            },
            xAxis: {
                categories: categories
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number of replies'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: series
        });
    });