import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { MessagingService } from '@app/services/messaging.service';
import { Store } from '@ngrx/store';
import { Chart } from 'chart.js';
import { GoogleAnalyticService } from '@app/services/google_analytic.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [GoogleAnalyticService]
})
export class DashboardComponent implements AfterViewInit {
    message;
    chart;
    mobile;
    pieChart;
    data;
    constructor(private messagingService: MessagingService, @Inject(PLATFORM_ID) public platformId: string, private store: Store<any>, private googleAnalyticService: GoogleAnalyticService) {
    }

    ngAfterViewInit() {
        this.googleAnalyticService.getAuthorizationCode().subscribe(data => {
            this.googleAnalyticService.getAnalytics(data['access_token']).subscribe(res => {
                let data = res['dataTable'].rows;
                let total = 0;
                data.forEach(item => {
                    total += parseInt(item.c[1].v);
                })

                this.data = data.map(item => {
                    return { location: item.c[0].v, visit: item.c[1].v, color: this.getRandomColor(), percent: this.getPercent(item.c[1].v, total) }
                })
                this.setupPieChart();

            })
        })
    }

    getPercent(value, total) {
        return Math.ceil(parseInt(value) / parseInt(total)) * 100;
    }

    setupLineChart() {
        this.chart = new Chart('canvas', {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                spanGaps: false,
                datasets: [{
                    label: 'My First dataset',
                    backgroundColor: '#ffe289',
                    borderColor: '#ffe289',
                    borderWidth: 1,
                    data: [
                        this.randomScalingFactor(),
                        this.randomScalingFactor(),
                        this.randomScalingFactor(),
                        this.randomScalingFactor(),
                        this.randomScalingFactor(),
                        this.randomScalingFactor(),
                        this.randomScalingFactor()
                    ],
                    fill: false,
                },
                {
                    label: 'My Second dataset',
                    fill: false,
                    backgroundColor: '#92d0ff',
                    borderColor: '#92d0ff',
                    borderWidth: 1,
                    data: [
                        this.randomScalingFactor(),
                        this.randomScalingFactor(),
                        this.randomScalingFactor(),
                        this.randomScalingFactor(),
                        this.randomScalingFactor(),
                        this.randomScalingFactor(),
                        this.randomScalingFactor()
                    ],
                },
                {
                    label: 'My Third dataset',
                    fill: false,
                    backgroundColor: '#272727',
                    borderColor: '#272727',
                    borderWidth: 1,
                    data: [
                        this.randomScalingFactor(),
                        this.randomScalingFactor(),
                        this.randomScalingFactor(),
                        this.randomScalingFactor(),
                        this.randomScalingFactor(),
                        this.randomScalingFactor(),
                        this.randomScalingFactor()
                    ],
                }
                ]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Chart.js Line Chart'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        gridLines: {
                            display: false
                        },
                        scaleLabel: {
                            display: false,
                            labelString: 'Month'
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false
                        },
                        display: true,
                        scaleLabel: {
                            display: false,
                            labelString: 'Value'
                        }
                    }]
                }
            }
        });
    }

    setupPieChart() {
        this.pieChart = new Chart('pieChart', {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: this.data.map(item => item.visit),
                    backgroundColor: this.data.map(item => item.color),
                    label: 'Dataset 1'
                }],
                labels: this.data.map(item => item.location),
            },
            options: {
                responsive: true,
                title: {
                    display: false
                },
                legend: {
                    display: false
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                }
            }
        });
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    get labelChart() {
        return this.data.map(item => {
            return item.c[0].v;
        })
    }

    ngOnInit() {
        this.setupLineChart();


        try {
            this.messagingService.getPermission();
            this.messagingService.receiveMessage();
            this.message = this.messagingService.currentMessage;
        } catch (error) {

        }
    }

    randomScalingFactor() {
        return Math.floor(Math.random() * 100);
    }
}
