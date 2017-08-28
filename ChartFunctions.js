function getWaterRingChart(elementId, mainValue) {
    var element = document.getElementById(elementId);
    var mainColor = colorGreen;

    if (mainValue > 320 || mainValue < 40) {
        mainColor = colorYellow;
    }
    if (mainValue < 20) {
        mainColor = colorRed;
    }

    var chart = new Chart(element, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                label: '# of Votes',
                data: [CIRCLE - mainValue, mainValue],
                backgroundColor: [
                    mainColor,
                    colorBlue
                ],
                borderColor: colorDarkGrey,
                borderWidth: '8px'
            }]
        },
        options: {
            rotation: (-0.5 * Math.PI) - ((CIRCLE - mainValue) / 2 * rad),
            legend: {
                display: false
            },
            cutoutPercentage: 80
        }
    });
    return chart;
}

function getLineChart(elementId, lastValues) {
    var element = document.getElementById(elementId);

    var chart = new Chart(element, {
        type: 'line',
        data: {
            labels: lastValues.labels,
            datasets: [{
                label: 'water',
                data: getSmoothed(lastValues.values, 4),
                backgroundColor: colorGreen,
                borderColor: colorBlue,
                borderWidth: '4px',
                pointRadius: 0
            }]
        },
        options: {
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            },
            scales: {
                xAxes: [{
                    display: false
                }],
                yAxes: [{
                    display: false
                }]
            }
        }
    });
    return chart;
}