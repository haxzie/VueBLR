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
import { GeoJsonLayer, PathLayer } from "@deck.gl/layers";
import { MapboxLayer } from "@deck.gl/mapbox";
const busStops = require('../assets/bus-stops.json');
const data = require("../assets/routes-data.json");


export default {
  components: {
    MglMap
  },
  data() {
    return {
      accessToken: process.env.VUE_APP_MAPBOX_TOKEN,
      mapStyle: "mapbox://styles/haxzie/ck0cctlg503xe1co6hmx1kunx",
      pathData: data,
      latitude: 77.4832668,
      longitude: 12.9491635,
      zoom: 13,
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

         const paths = new MapboxLayer({
        id: "path-layer",
        type: PathLayer,
        data: this.pathData,
        widthScale: 20,
        widthMinPixels: 2,
        getPath: d => d.path,
        getColor: d => [0, 0, 0, 50],
        getWidth: d => 1
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
        map.addLayer(paths, 'poi-label');
        map.addLayer(busStopsLayer, 'poi-label');
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
