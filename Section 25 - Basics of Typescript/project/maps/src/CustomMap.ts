// import { Company } from './Company';
// import { User } from './User';

export interface Mappable {
	location: {
		lat: number;
		lng: number;
	};
	markerContent(): string;
}

export class CustomMap {
	private googleMap: google.maps.Map;

	constructor(divId: string) {
		// Typescript also has a non-null assertion that
		// you can use when you are sure that the value is never
		// null by adding the! operator to the end of your statement
		const element: HTMLElement = document.getElementById(divId)!;
		this.googleMap = new google.maps.Map(element, {
			zoom: 1,
			center: {
				lat: 0,
				lng: 0,
			},
		});
	}

	// if we use user: (User | Company) then we can access only common properties of both
	// addUserMarker(user: User): void {
	// 	new google.maps.Marker({
	// 		map: this.googleMap,
	// 		position: {
	// 			lat: user.location.lat,
	// 			lng: user.location.lng,
	// 		},
	// 	});
	// }

	// addCompanyMarker(company: Company): void {
	// 	new google.maps.Marker({
	// 		map: this.googleMap,
	// 		position: {
	// 			lat: company.location.lat,
	// 			lng: company.location.lng,
	// 		},
	// 	});
	// }

	addMarker(mappable: Mappable): void {
		const marker = new google.maps.Marker({
			map: this.googleMap,
			position: {
				lat: mappable.location.lat,
				lng: mappable.location.lng,
			},
		});
		marker.addListener('click', () => {
			const infoWindow = new google.maps.InfoWindow({
				content: mappable.markerContent(),
			});
			infoWindow.open(this.googleMap, marker);
		});
	}
}
