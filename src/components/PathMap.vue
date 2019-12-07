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
import { PathLayer } from "@deck.gl/layers";
import { MapboxLayer } from "@deck.gl/mapbox";
const data = require("../assets/routes-data.json");

export default {
  components: {
    MglMap
  },
  data() {
    return {
      accessToken: process.env.VUE_APP_MAPBOX_TOKEN,
      mapStyle: "mapbox://styles/haxzie/ck0aryyna2lwq1crp7fwpm5vz",
      pathData: data,
      latitude: 77.571529,
      longitude: 12.976387,
      zoom: 10,
      bearing: 0,
      pitch: 0,
      deck: null
    };
  },
  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  },
  methods: {
    loadLayers(e) {
      this.map = e.map;
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
        getColor: d => [255, (1 - d.data.distance/100)*255, 0],
        getWidth: d => 2
      });

      map.addLayer(paths, "road-label");
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
