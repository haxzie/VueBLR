<template>
  <div class="map-container">
    <MglMap
      :accessToken="accessToken"
      :mapStyle="mapStyle"
      :center="[latitude, longitude]"
      :zoom="zoom"
      :bearing="bearing"
      :pitch="pitch"
      @load="loadLayers"
    />    
  </div>
</template>

<script>
/* eslint-disable */
import MglMap from "vue-mapbox";
import Mapbox from "mapbox-gl";
import { ArcLayer, GeoJsonLayer } from "@deck.gl/layers";
import { MapboxLayer } from "@deck.gl/mapbox";
const data = require('../assets/reach-data.json');
const busStops = require('../assets/bus-stops.json');

export default {
  components: {
    MglMap
  },
  data() {
    return {
      accessToken: process.env.VUE_APP_MAPBOX_TOKEN,
      mapStyle: "mapbox://styles/haxzie/ck0aryyna2lwq1crp7fwpm5vz",
      heatData: data,
      latitude: 77.4832668,
      longitude: 12.9491635,
      zoom: 10,
      bearing: 0,
      pitch: 45,
      deck: null
    };
  },
  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  },
  methods: {
    loadLayers(e) {
      //console.log(e.map);
      this.loadDeckGl(e.map);
    },  
    async loadDeckGl(map) {
     
       const layer = new MapboxLayer({
            id: 'arc-layer',
            type: ArcLayer,
            data,
            pickable: true,
            getWidth: 2,
            getSourcePosition: d => d[0],
            getTargetPosition: d => d[1],
            getSourceColor: d => [66, 135, 245],
            getTargetColor: d => [240, 48, 74],
        });

        const busStopsLayer = new MapboxLayer({
        id: 'geojson-layer',
        type: GeoJsonLayer,
        data: busStops,
        filled: true,
        lineWidthScale: 20,
        lineWidthMinPixels: 2,
        getFillColor: d => [245, 133, 5, 0],
        getLineColor: d => [245, 133, 5],
        getRadius: 50,
        getLineWidth: 1,
        
    });

        map.addLayer(busStopsLayer, 'road-label');
      map.addLayer(layer, 'road-label');
      this.map = map;
    }
  },
  mounted() {
    this.map = null;
  }
};
</script>

<style lang="scss">
.map-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  #map,
  #deck-gl-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .menu-card {
    width: 300px;
    height: 500px;
    background: #c0c0c0;
    position: absolute;
    top: 12px;
    left: 10px;
  }
}
</style>
