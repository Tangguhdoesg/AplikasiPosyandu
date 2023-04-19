import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';
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
  graphData: healthInfoGraph[] | undefined;
  graphDataLen: number = 0;

  optionx: any;
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


    this.optionx = {
      title: {
        text: 'Data'
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
        data: ['X-1', 'X-2', 'X-3', 'X-4', 'X-5']
      }, 
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis:  [
        {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          // splitLine: {
          //   show: false
          // }
        }
      ],
      yAxis: {
        type: 'value',
        // splitLine: {
        //   show: false
        // }
      },
      series: [
        {
          name: 'X-1',
          type: 'line',
          // stack: 'counts',
          color: 'red',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'X-2',
          type: 'line',
          // stack: 'counts',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'X-3',
          type: 'line',
          // stack: 'counts',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: 'X-4',
          type: 'line',
          // stack: 'counts',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: 'X-5',
          type: 'line',
          // stack: 'counts',
          label: {
            show: true,
            position: 'top',
          },
          data: [820, 932, 0, 934, 1290, 1330, 1320]
        }
      ]
    };

  }

  getAllUserGraph() {
    // this.isLoading = true;
    // this.isError = false;
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
        // this.isLoading = false;
      }, err => {
        // this.isError = true;
        // this.isLoading = false;
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
    
  }

  setHeigthGraph(data: healthInfoGraph) {
    this.optionHeight.push({
      title: {
        text: 'Tinggi Badan '+ data.namaBalita
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
        name: 'tinggi badan (cm)',
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
