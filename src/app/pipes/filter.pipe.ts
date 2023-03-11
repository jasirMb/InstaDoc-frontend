import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if(!items) return [];
    if(!searchTerm) return items;
    searchTerm = searchTerm.toLowerCase();
    return items.filter(doctor => doctor.doctorName.toLowerCase().includes(searchTerm) || doctor.specialization.toLowerCase().includes(searchTerm)|| doctor.city.toLowerCase().includes(searchTerm));
  }
}
