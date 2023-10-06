import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { Observer, Subject, debounceTime, distinctUntilChanged, filter, fromEvent, map, takeUntil } from 'rxjs';
import { ToasterService } from './services/toaster.service';
interface response {
  main: {
    humidity: number;
    temp_max: number;
    temp_min: number;
    temp: number;
  };
  name: string;
  weather: [
    {
      description: string;
      icon: string;
      main: string;
    }
  ];
  wind: {
    speed: number;
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'FindWeather';

  // variables

  weatherDatas: response | null = null;
  weatherIconSrc: string = '../assets/clear.png';
  cityName: string = '';
  suggestedPlaces: string[] |null= null;
  loading:boolean=false

  private _unsubscribe$ = new Subject<void>();

  constructor(private _weatherServices: WeatherService,
  private _toasterServices:ToasterService) {}

  ngOnInit(): void {
    this.loading=true
    console.log(this.loading);
    
    // this._cdr.detectChanges()
    if (navigator.geolocation) {
      console.log('navigator works');
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude);
          
          this._weatherServices
            .getWeatherOnGeoLocation(
              position.coords.latitude,
              position.coords.longitude
              )
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe((res) => {
              this.weatherDatas = res;
              this.loading=false
            });
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
        );
      }
      else{
        this.loading=false
        console.log('navigator not works');
      }


      const inputElement = document.querySelector('.searchInput') as HTMLInputElement;

      const input$ = fromEvent(inputElement, 'keyup').pipe(
        debounceTime(300), // Debounce for 300ms
        map((event: Event) => (event.target as HTMLInputElement).value),
        distinctUntilChanged(), // Only emit distinct values
        takeUntil(this._unsubscribe$) // Unsubscribe when component is destroyed
      );
    
      input$.subscribe((query: string) => {
        this.fetchLocation(query);
      });

  
  }

  fetchLocation(query:string) {    
    if (!this.cityName) {      
      this.suggestedPlaces=null      
      return
    }
    this._weatherServices
      .getSuggestions(query)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res) => {
        this.suggestedPlaces = res.features.map((data) => {
          return data.place_name;
        });
      });
  }

  getSuggestion(event: Event) {
    const input = event.target as HTMLInputElement;
    const location = input.textContent
    this.cityName=location!;
    this.suggestedPlaces=null
  }



  onSearch() {
    this.loading = true;
    
    const observer: Observer<response> = {
      next: (res: response) => {
        // Handle success
        this.weatherDatas = res;
        this.loading = false;
      },
      error: (error: any) => {
        // Handle error        

        this._toasterServices.showToaster()
        this.loading = false;
      },
      complete: () => {
        // Handle completion if needed
      },
    };
  
    this._weatherServices
      .getWeatherData(this.cityName)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(observer);
  }


  



  ngOnDestroy(): void {}
}
