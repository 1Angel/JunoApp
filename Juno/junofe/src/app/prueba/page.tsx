"use client"

import dynamic from 'next/dynamic';
import styles from "../../app/page.module.css";
import { useEffect, useMemo, useRef, useState } from 'react';
import { Marker as LeafletMarker } from 'leaflet';
import { LatLngExpression, } from "leaflet";
import MapMarker from '@/components/Marker';

//render the map
const DynamicMap = dynamic(() => import('../../components/Map'), {
  loading: () => (
    <p>Loading map....</p>
  ),
  ssr: !!false
});

export default function Page() {
  const [draggable, setDraggable] = useState(true);
  const [position, setPosition] = useState<LatLngExpression>([18.476063, -69.913078]);
  const markerRef = useRef<LeafletMarker>(null)

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
      },
    }),
    [],
  )
  useEffect(() => {
    console.log(position);
  }, [position]);


  return (
    <div>
      <article className={styles.article}>
        <div className={styles.container}>
          <DynamicMap>
            <MapMarker
              position={position}
              popUpTitle={'Hello World!!!'}
              draggable={draggable}
              marketEvent={eventHandlers}
              marketRef={markerRef} />
          </DynamicMap>
        </div>
      </article>
    </div>)
}