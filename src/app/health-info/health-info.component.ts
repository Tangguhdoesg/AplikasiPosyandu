import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AppServiceService } from '../app-service.service';
import { healthInfoGraph } from '../models';

@Component({
  selector: 'app-health-info',
  templateUrl: './health-info.component.html',
  styleUrls: ['./health-info.component.scss']
})
export class HealthInfoComponent {
  destroySubject$: Subject<void> = new Subject();
  graphData: healthInfoGraph[] = [];
  graphDataLen: number = 0;

  isLoading: boolean = false;
  isError: boolean = false;
  isNoData: boolean = false;

  optionWeight: any[] = [];
  optionHeight: any[] = [];

  private oneDay = 24 * 3600 * 1000;
  private now!: Date;
  private value!: number;
  private data: any[] = [{ a:1 , b:2}, { a:3 , b:5}, { a:6 , b:1}, { a:9 , b:7}];
  private timer: any;

  constructor(private service: AppServiceService) { }

  ngOnInit(): void {
    this.optionWeight = [];
    this.optionHeight = [];
    this.getAllUserGraph();
  }

  getAllUserGraph() {
    this.isLoading = true;
    this.isError = false;
    this.isNoData = false;
    this.service.getAllUserGraph(sessionStorage.getItem('id'))
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(datas => {
        this.graphData = [...datas];
        this.graphDataLen = datas.length;
        console.log(this.graphData);
        
        if (this.graphDataLen > 0) {
          this.graphData.forEach(gData => {
            this.setWeightGraph(gData);
            this.setHeigthGraph(gData);
          })
        }
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
        if (err.status === 404) {
          this.isNoData = true;
        } else {
          this.isError = true;
        }
      })
  }

  setWeightGraph(data: healthInfoGraph) {
    this.optionWeight.push({
      title: {
        text: 'Berat Badan '+ data.namaBalita
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Ideal', 'Batas', 'Balita']
      }, 
      grid: {
        left: '5%',
        right: '10%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          name: 'usia (bulan)',
          type: 'category',
          boundaryGap: false,
          data: data.umurMedian
        }
      ],
      yAxis: {
        name: 'berat badan (kg)',
        type: 'value'
      },
      series: [
        {
          name: 'Ideal',
          type: 'line',
          color: 'lightgreen',
          data: data.medianWeight
        },
        {
          name: 'Batas',
          type: 'line',
          color: 'yellow',
          data: data.batasAtasBerat
        },
        {
          name: 'Batas',
          type: 'line',
          color: 'yellow',
          data: data.batasBawahBerat
        },
        {
          name: 'Balita',
          type: 'line',
          color: 'blue',
          label: {
            show: true,
            position: 'top',
          },
          data: data.beratBalita
        }
      ]
    });
    console.log(this.optionWeight);
    console.log(this.optionWeight[0]);
    console.log(this.graphData);
    
  }

  setHeigthGraph(data: healthInfoGraph) {
    this.optionHeight.push({
      title: {
        text: 'Panjang Badan '+ data.namaBalita
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Ideal', 'Balita', 'Batas']
      }, 
      grid: {
        left: '5%',
        right: '10%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          name: 'usia (bulan)',
          type: 'category',
          boundaryGap: false,
          data: data.umurMedian
        }
      ],
      yAxis: {
        name: 'Panjang badan (cm)',
        type: 'value'
      },
      series: [
        {
          name: 'Ideal',
          type: 'line',
          color: 'lightgreen',
          data: data.medianLength
        },
        {
          name: 'Balita',
          type: 'line',
          color: 'blue',
          label: {
            show: true,
            position: 'top',
          },
          data: data.tinggiBalita
        },
        {
          name: 'Batas',
          type: 'line',
          color: 'yellow',
          data: data.batasAtasPanjang
        },
        {
          name: 'Batas',
          type: 'line',
          color: 'yellow',
          data: data.batasBawahPanjang
        }
      ]
    });
  }

}
