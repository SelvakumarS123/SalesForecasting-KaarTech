import {
  Component,
  OnInit,
  Input,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { FlaskapiService } from 'src/app/flaskapi.service';

@Component({
  selector: 'app-prediction-result',
  templateUrl: './prediction-result.component.html',
  styleUrls: ['./prediction-result.component.css'],
  providers: [FlaskapiService],
})
export class PredictionResultComponent implements OnInit {
  predicted_date: any = [];
  predicted_column: any = [];
  mae: Number;
  mape: Number;
  mse: Number;
  rmse: Number;
  predictedColumnName: any;
  columnName: any;
  periodicity: any;
  numericalValue: any;
  lineChart: any = [];
  barChart: any = [];
  public getCurrentPredictionSubscription: Subscription;

  constructor(
    private router: Router,
    private flaskApiService: FlaskapiService,
    private modalService: NgbModal,
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getPrediction();
  }

  ngOnDestroy() {
    if (this.getCurrentPredictionSubscription) {
      this.getCurrentPredictionSubscription.unsubscribe();
    }
  }

  getPrediction() {
    this.getCurrentPredictionSubscription = this.flaskApiService
      .getCurrentPrediction(localStorage.getItem('email'))
      .subscribe((response) => {
        this.predicted_date = response['data'].predictedDate;
        this.predicted_column = response['data'].predictedColumn;
        this.predictedColumnName = response['data'].predictedColumnName;
        this.columnName = response['data'].columnName;
        this.mape = response['data'].mape.toFixed(3);
        this.mae = response['data'].mae.toFixed(3);
        this.rmse = response['data'].rmse.toFixed(3);
        this.mse = response['data'].mse.toFixed(3);
        this.numericalValue = response['data'].numericalValue;

        if (response['data'].periodicity == 'Yearly') {
          if (response['data'].numericalValue > 1) {
            this.periodicity = 'years';
          } else {
            this.periodicity = 'year';
          }
        } else if (response['data'].periodicity == 'Monthly') {
          if (response['data'].numericalValue > 1) {
            this.periodicity = 'months';
          } else {
            this.periodicity = 'month';
          }
        } else if (response['data'].periodicity == 'Weekly') {
          if (response['data'].numericalValue > 1) {
            this.periodicity = 'weeks';
          } else {
            this.periodicity = 'week';
          }
        } else {
          if (response['data'].numericalValue > 1) {
            this.periodicity = 'days';
          } else {
            this.periodicity = 'day';
          }
        }
          this.linePlot(
          this.predictedColumnName,
          this.predicted_column,
          this.predicted_date,
          this.columnName
        );
          this.barPlot(
          this.predictedColumnName,
          this.predicted_column,
          this.predicted_date,
          this.columnName
        );
      });
  }

  barPlot(
    predictedColumnName: any,
    predicted_column: any[],
    predicted_date: any[],
    columnName: any
  ) {
    var lineChartExist = Chart.getChart('barPlot');

    if (lineChartExist != undefined) {
      lineChartExist.destroy();
    }
    this.barChart = new Chart('barPlot', {
      type: 'bar',
      data: {
        labels: predicted_date,
        datasets: [
          {
            label: predictedColumnName,
            data: predicted_column,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 3,
          },
        ],
      },

      options: {
        responsive: true,
        interaction: {
          intersect: false,
        },
        scales: {
          y: {
            display: true,
            title: {
              display: true,
              text: columnName,
            },
            suggestedMin: Math.min(...predicted_column) - 1,
            suggestedMax: Math.max(...predicted_column) + 1,
          },
        },
      },
    });
  }

  linePlot(
    predictedColumnName: any,
    predicted_column: any[],
    predicted_date: any[],
    columnName: any
  ) {
    var lineChartExist = Chart.getChart('linePlot');

    if (lineChartExist != undefined) {
      lineChartExist.destroy();
    }

    this.lineChart = new Chart('linePlot', {
      type: 'line',
      data: {
        labels: predicted_date,
        datasets: [
          {
            label: predictedColumnName,
            data: predicted_column,
            fill: false,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 3,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(255, 255, 255, 1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(0, 0, 0, 1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
          },
        ],
      },

      options: {
        responsive: true,
        interaction: {
          intersect: false,
        },
        scales: {
          y: {
            display: true,
            title: {
              display: true,
              text: columnName,
            },
          },
        },
      },
    });
  }


}
