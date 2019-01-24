import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { GoogleAnalyticService } from '@app/services/google_analytic.service';
import { MessagingService } from '@app/services/messaging.service';
import { UserService } from '@app/services/user.service';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [GoogleAnalyticService, UserService]
})
export class DashboardComponent implements AfterViewInit {
    message;
    chart;
    mobile;
    pieChart;
    data;
    total = 0;
    cost = [];
    labels = [];
    profits = [];
    totalCost = 0;
    totalProfit = 0;
    constructor(private messagingService: MessagingService, @Inject(PLATFORM_ID) public platformId: string,
        private googleAnalyticService: GoogleAnalyticService, private userService: UserService) {

    }

    ngAfterViewInit() {
        this.googleAnalyticService.getAuthorizationCode().subscribe(data => {
            this.googleAnalyticService.getAnalytics(data['access_token']).subscribe(res => {
                let data = res['dataTable'].rows;
                data.forEach(item => {
                    this.total += parseInt(item.c[1].v);
                })

                this.data = data.map(item => {
                    return { location: item.c[0].v, visit: item.c[1].v, color: this.getRandomColor(), percent: this.getPercent(item.c[1].v, this.total) }
                })
                this.setupPieChart();

            })
        })
    }

    getPercent(value, total) {
        return Math.ceil(parseInt(value) / parseInt(total) * 100) ;
    }

    getUserData() {
        let today = moment(new Date());
        let todayString = today.startOf('month').format('YYYY-MM-DD');
        this.labels.push(today.format('MMMM'));
        let previousMonth = today.subtract(1, 'months');
        let previousStartMonthString = previousMonth.startOf('month').format('YYYY-MM-DD');
        let previousEndMonthString = previousMonth.endOf('month').format('YYYY-MM-DD');
        this.labels.push(previousMonth.format('MMMM'));
        let twoMonthAgo = today.subtract(1, 'months');
        let twoMonthStartMonthString = twoMonthAgo.startOf('month').format('YYYY-MM-DD');
        let twoMonthEndMonthString = twoMonthAgo.endOf('month').format('YYYY-MM-DD');
        this.labels.push(twoMonthAgo.format('MMMM'));

        forkJoin(
            this.userService.getAllByMonth(new Date(twoMonthStartMonthString), new Date(twoMonthEndMonthString)).take(1),
            this.userService.getAllByMonth(new Date(previousStartMonthString), new Date(previousEndMonthString)).take(1),
            this.userService.getAllByMonth(new Date(todayString), new Date()).take(1)
        ).subscribe(([res1, res2, res3]) => {
            this.cost.push(this.getCost(res1));
            this.cost.push(this.getCost(res2));
            this.cost.push(this.getCost(res3));
            this.totalCost = this.cost.reduce((acc, cur) => {
                return acc += cur;
            })
            
            this.profits.push(this.getProfit(res1, moment(new Date(twoMonthStartMonthString)), moment(new Date(twoMonthEndMonthString))));
            this.profits.push(this.getProfit(res2, moment(new Date(previousStartMonthString)), moment(new Date(previousEndMonthString))));
            this.profits.push(this.getProfit(res3, moment(new Date(todayString)), moment(new Date())));
            this.totalProfit = this.profits.reduce((acc, cur) => {
                return acc += cur;
            })
            this.setupLineChart();
        });
    }

    getCost(res) {
        let data = 0;
        res.forEach(item => {
            data += parseInt(item.money);
        })
        return data;
    }

    getProfit(res, start, end) {
        let data = 0;
        res.forEach(item => {
            let createDate = moment.unix(item.createdAt.seconds);
            let endDate = moment.unix(item.createdAt.seconds).add(parseInt(item.long), 'months');
            let diffDate = (endDate.isBefore(end) ? endDate : end).diff((createDate.isAfter(start) ? createDate : start), 'days');
            data += (diffDate * item.laixuat);
        })
        return data;
    }

    setupLineChart() {


        this.chart = new Chart('canvas', {
            type: 'line',
            data: {
                labels: this.labels.reverse(),
                spanGaps: false,
                datasets: [{
                    label: 'Chi Phí',
                    backgroundColor: '#ffe289',
                    borderColor: '#ffe289',
                    borderWidth: 1,
                    data: this.cost,
                    fill: false,
                    yAxisID: "y-axis-1"
                },
                {
                    label: 'Lợi nhuận',
                    fill: false,
                    backgroundColor: '#92d0ff',
                    borderColor: '#92d0ff',
                    borderWidth: 1,
                    data: this.profits,
                    yAxisID: "y-axis-2"
                }
                ]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Báo cáo tài chính'
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
                    // yAxes: [{
                    //     gridLines: {
                    //         display: false
                    //     },
                    //     display: true,
                    //     scaleLabel: {
                    //         display: false,
                    //         labelString: 'Value'
                    //     }
                    // }],
                    yAxes: [{
                        type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                        display: true,
                        position: "left",
                        id: "y-axis-1",
                        scaleLabel: {
                            display: false,
                            labelString: 'Value'
                        },
                        gridLines: {
                            display: false
                        },
                    }, {
                        type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                        display: true,
                        position: "right",
                        id: "y-axis-2",
                        scaleLabel: {
                            display: false,
                            labelString: 'Value'
                        },
                        // grid line settings
                        gridLines: {
                            display: false,
                            drawOnChartArea: false, // only want the grid lines for one axis to show up
                        },
                    }],
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
        this.getUserData();
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
