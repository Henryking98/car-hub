import {CarProps, FilterProps} from "@/types";

export async function fetchCars(filters: FilterProps) {
    const {manufacturer, year, model, limit, fuel} = filters;
    const headers = {
        'X-RapidAPI-Key': '43be5c5c11msh5520fe34387ba6bp184650jsnd7041313b4b6',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }
    const response =  await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`, {
        headers: headers
    });

    return await response.json();

}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50;
    const mileageFactor = 0.1;
    const ageFactor = 0.05

    const mileageRage = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;

    const rentalRatePerDay = basePricePerDay + mileageRage + ageRate;

    return rentalRatePerDay.toFixed(0)
}

export const generateCarImageUri = (car: CarProps, angle?: string) => {
    const url = new URL('https://cdn.imagin.studio/getimage');
    const {make, year, model} = car;

    url.searchParams.append('customer', 'hrjavascript-mastery');
    url.searchParams.append('make', make)
    url.searchParams.append('modelFamily', model.split(' ')[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    url.searchParams.append('angle', `${angle}`);

    return `${url}`;
}

export const updateSearchParams = (type: string, value: string) => {
    const searchParam = new URLSearchParams(window.location.search);

    searchParam.set(type, value)

    return `${window.location.pathname}?${searchParam.toString()}`;
}