import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
interface i_mapBoxResp{
    features:{
        place_name: string;
        center: number[]
    }[]

}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _http:HttpClient) {

  }

  getWeatherData(cityName:string){
    
   const baseUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=Metric&&appid=${environment.weatherApiKey}`
   return this._http.get<any>(baseUrl)
  }

  getWeatherOnGeoLocation(lat:number,lon:number){
    
    const baseUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=Metric&appid=${environment.weatherApiKey}`
    return this._http.get<any>(baseUrl)
  }

  getSuggestions(query: string):Observable<i_mapBoxResp> {
    const trimmedQuery = query.trim();    
    const url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(trimmedQuery)}.json?access_token=${environment.MAPBOX_ACCESS_TOKEN}`    
    return this._http.get<i_mapBoxResp>(url);
  }
}
