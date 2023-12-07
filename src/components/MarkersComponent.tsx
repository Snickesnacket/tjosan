import { Restaurant } from "../types/Restaurant.types";
import { InfoWindowData } from "../types/Google.types";
import { InfoWindow, MarkerF } from "@react-google-maps/api";

interface Iprops {
  validRestaurants: Restaurant[];
  handleMarkerClick: (restaurant: Restaurant) => void;
  handleInfoWindowClose: () => void;
  isOpen: boolean;
  infoWindowData: InfoWindowData | null;
}
export const MarkersComponent: React.FC<Iprops> = ({
  validRestaurants,
  handleMarkerClick,
  handleInfoWindowClose,
  isOpen,
  infoWindowData,
}) => {
  
  return (
    <>
      {validRestaurants.map((restaurant: Restaurant) => {
         if (typeof restaurant.Latitude !== 'number' || typeof restaurant.Longitude !== 'number') {
          console.error('undefined lat/lng restaurang:', restaurant);
          return null;}
        return (
          <MarkerF
            key={restaurant._id}
            position={{
              lat: restaurant.Latitude,
              lng: restaurant.Longitude,
            }}
            onClick={() => handleMarkerClick(restaurant)}
          >
            {isOpen && infoWindowData?.id === restaurant._id && (
              <InfoWindow onCloseClick={handleInfoWindowClose}>
                <div  style={{ color: 'black' }}>
                <h3>{infoWindowData.Namn}</h3>
                  <p>{infoWindowData.Gatuadress}</p>
                  <p>{infoWindowData.Ort}</p>
                </div>
              </InfoWindow>
            )}
          </MarkerF>
        );
      })}
    </>
  );

};