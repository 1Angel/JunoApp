import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { form, required, FormField, email } from '@angular/forms/signals';
import { CustomInput } from '../../components/CustomInput/CustomInput';

interface CreatePropertyForm {
  price: number,
  bedrooms: number,
  bathrooms: number,
  description: string,
  homeType: string,
  street: string,
  city: string,
  province: string,
  latitude: number,
  longitude: number,
  square_meters: number,
}

interface provinces {
  name: string;
  capital: string;
}


@Component({
  selector: 'app-create-property-page',
  imports: [JsonPipe, FormField, CustomInput],
  templateUrl: './CreatePropertyPage.html',
  styleUrl: './CreatePropertyPage.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePropertyPage {

  propertyModel = signal<CreatePropertyForm>({
    bedrooms: 1,
    bathrooms: 1,
    description: '',
    homeType: 'FOR_RENT',
    street: '',
    city: '',
    province: '',
    price: 10000,
    longitude: 1,
    latitude: 1,
    square_meters: 10
  });

  propertyForm = form(this.propertyModel, (path) => {
    required(path.description, { message: "Description is required" }),
    email(path.description, {message: "email is invalid"})
    });


  efecto = effect(()=> {
    console.log(`${this.propertyModel().city}`);
  })


  Create(event: Event){
    event.preventDefault();
    console.log(this.propertyForm().value());
    console.log(this.propertyForm().errors());
  }












  provinciasRD = [
    "Distrito Nacional",
    "Azua",
    "Baoruco",
    "Barahona",
    "Dajabón",
    "Duarte",
    "Elías Piña",
    "El Seibo",
    "Espaillat",
    "Hato Mayor",
    "Hermanas Mirabal",
    "Independencia",
    "La Altagracia",
    "La Romana",
    "La Vega",
    "María Trinidad Sánchez",
    "Montecristi",
    "Pedernales",
    "Peravia",
    "Puerto Plata",
    "Samaná",
    "San Cristóbal",
    "San José de Ocoa",
    "San Juan",
    "San Pedro de Macorís",
    "Sánchez Ramírez",
    "Santiago",
    "Santiago Rodríguez",
    "Santo Domingo",
    "Valverde",
    "Monte Plata"
  ];
}
