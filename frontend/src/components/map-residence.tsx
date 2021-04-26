import { actions, useAppDispatch } from '@/ducks/store';
import { Residence, useUpdateResidenceMutation } from '@/types/graphql';
import { Marker } from '@react-google-maps/api';
import React, { memo } from 'react';
import equal from 'fast-deep-equal';

// https://fonts.google.com/icons?selected=Material+Icons&icon.query=house
const HousePath = 'M19,9.3V4h-3v2.6L12,3L2,12h3v8h5v-6h4v6h5v-8h3L19,9.3z M10,10c0-1.1,0.9-2,2-2s2,0.9,2,2H10z';
const ApartmentPath =
  'M17,11V3H7v4H3v14h8v-4h2v4h8V11H17z M7,19H5v-2h2V19z M7,15H5v-2h2V15z M7,11H5V9h2V11z M11,15H9v-2h2V15z M11,11H9V9h2 V11z M11,7H9V5h2V7z M15,15h-2v-2h2V15z M15,11h-2V9h2V11z M15,7h-2V5h2V7z M19,19h-2v-2h2V19z M19,15h-2v-2h2V15z';

export const MapResidence = memo(
  (props: { residence: Residence; selected: boolean; draggable: boolean; selectable: boolean }) => {
    const dispatch = useAppDispatch();

    // この辺も全部含めて切り出せそう。
    const [updateResidence] = useUpdateResidenceMutation();
    const updateResidenceTest = (lat: number, lng: number) =>
      updateResidence({
        variables: {
          id: props.residence.id,
          latitude: lat,
          longitude: lng,
        },
        optimisticResponse: {
          __typename: 'Mutation',
          updateResidence: {
            __typename: 'Residence',
            id: props.residence.id,
            name: props.residence.name,
            latitude: lat,
            longitude: lng,
            residents: props.residence.residents,
          },
        },
      });

    return (
      <Marker
        position={{ lat: props.residence.latitude, lng: props.residence.longitude }}
        cursor={props.draggable ? 'grab' : 'pointer'}
        icon={{
          fillColor: (props.residence as any).isOptimistic ? '#000000' : props.selected ? '#0000FF' : '#8888FF', //塗り潰し色
          strokeColor: '#6666AA', //枠の色
          fillOpacity: 1.0,
          strokeOpacity: 1.0,
          strokeWeight: 1.0, //枠の透過率
          anchor: new window.google.maps.Point(12, 12),
          path: props.residence.residents.length >= 2 ? ApartmentPath : HousePath,
          scale: 1.5,
        }}
        draggable={props.draggable}
        clickable={props.selectable}
        onClick={() => dispatch(actions.setSelectedResidenceId(Number(props.residence.id)))}
        onDragEnd={(e) => {
          updateResidenceTest(e.latLng.lat(), e.latLng.lng());
        }}
      />
    );
  },
  (prev, next) => equal(prev, next),
);
