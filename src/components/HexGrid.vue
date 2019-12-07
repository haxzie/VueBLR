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
import {HeatmapLayer} from '@deck.gl/aggregation-layers';
import {geoToH3} from 'h3-js'
import { H3HexagonLayer } from "@deck.gl/geo-layers";
import { MapboxLayer } from "@deck.gl/mapbox";
const data = require('../assets/raw-location-data.json');

export default {
  components: {
    MglMap
  },
  data() {
    return {
      accessToken: process.env.VUE_APP_MAPBOX_TOKEN,
      mapStyle: "mapbox://styles/haxzie/ck0aryyna2lwq1crp7fwpm5vz",
      heatData: data,
      latitude: 74.9414027,
      longitude: 12.5971067,
      zoom: 5,
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

      let hexGrids = data.locations.map(location => {
        return geoToH3(location.latitudeE7/10000000 ,location.longitudeE7/10000000, 10)
      });

      let hexCounts = hexGrids.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {})
      let finalData = Object.keys(hexCounts).map(grid_id => {
        return {
          grid: grid_id,
          count: hexCounts[grid_id]
        }
      })
      const hexLayer = new MapboxLayer({
        id: "h3-hexagon-layer",
        type: H3HexagonLayer,
        data: finalData,
        pickable: true,
        wireframe: false,
        filled: true,
        extruded: true,
        elevationScale: 1,
        getHexagon: d => d.grid,
        getFillColor: d => [255, (1 - d.count / 500) * 255, 0],
        getElevation: d => d.count
      });

      map.addLayer(hexLayer, 'road-label');
      this.map = map;
      // const heatLayer = new MapboxLayer({
      //   id: "heatmap-layer",
      //   type: PathLayer,
      //   data: this.heatData,
      //   getPosition: d => [d.location[1], d.location[0]],
      //   getWeight: d => d.weight
      // });

      // map.addLayer(heatLayer);
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
