import {Loader, LoaderOptions} from 'google-maps';
// or const {Loader} = require('google-maps'); without typescript
 
const options: LoaderOptions = {/* todo */};
const loader = new Loader('AIzaSyCaeB3RGOnvdm5g1vZSXXUl3vcNKQ26Q6U', options);
 
const google = await loader.load();
const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8,
});