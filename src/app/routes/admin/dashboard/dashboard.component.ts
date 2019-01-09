import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { MessagingService } from '@app/services/messaging.service';
import { Chart } from 'chart.js';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
    message;
    chart;
    mobile;
    pieChart;
    constructor(private messagingService: MessagingService, @Inject(PLATFORM_ID) public platformId: string) {
        // if (isPlatformBrowser(this.platformId)) {
        //     if (window.screen.width <= 576) {
        //         this.mobile = true;
        //     }
        // }
    }
    
    ngAfterViewInit() {
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
        this.pieChart = new Chart('pieChart',{
            type: 'doughnut',
            data: {
                datasets: [{
					data: [
						this.randomScalingFactor(),
						this.randomScalingFactor(),
						this.randomScalingFactor(),
						this.randomScalingFactor(),
						this.randomScalingFactor(),
					],
					backgroundColor: [
						'red',
						'orange',
						'yellow',
						'green',
						'blue',
					],
					label: 'Dataset 1'
				}],
				labels: [
					'Red',
					'Orange',
					'Yellow',
					'Green',
					'Blue'
				]
            },
            options: {
                responsive: true
            }
        });
    }

    ngOnInit() {
        this.setupLineChart();
        this.setupPieChart();


        try {
            this.messagingService.getPermission();
            this.messagingService.receiveMessage();
            this.message = this.messagingService.currentMessage;
        } catch (error) {

        }
    }

    randomScalingFactor() {
        return Math.abs(Math.random() * 100);
    }
}
