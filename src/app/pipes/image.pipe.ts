import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(value:string|null): string {
    let weatherIconSrc
    if (
      value === '01d' ||
      value === '01n'
    ) {
      weatherIconSrc= '../assets/clear.png';
    } else if (
      value === '02d' ||
      value === '02n'
    ) {
      weatherIconSrc= '../assets/cloud.png';
    } else if (
      value === '03d' ||
      value === '03n'
    ) {
      weatherIconSrc= '../assets/drizzle.png';
    } else if (
      value === '04d' ||
      value === '04n'
    ) {
      weatherIconSrc= '../assets/drizzle.png';
    } else if (
      value === '09d' ||
      value === '09n'
    ) {
      weatherIconSrc= '../assets/rain.png';
    } else if (
      value === '010d' ||
      value === '010n'
    ) {
      weatherIconSrc= '../assets/rain.png';
    } else if (
      value === '013d' ||
      value === '013n'
    ) {
      weatherIconSrc= '../assets/snow.png';
    } else {
      weatherIconSrc= '../assets/clear.png';
    }
    return weatherIconSrc
  }

}
