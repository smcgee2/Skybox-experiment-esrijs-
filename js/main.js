   require([
       "esri/Map",
       "esri/views/SceneView",
       "esri/layers/SceneLayer",
       "esri/core/watchUtils"
   ], function(Map, SceneView, SceneLayer, watchUtils) {

       // esri map setup
       const map = new Map({
           basemap: "satellite",
           ground: "world-elevation",
           layers: [
               new SceneLayer({
                   portalItem: {
                       id: "b343e14455fe45b98a2c20ebbceec0b0"
                   }
               })
           ]
       });

       // scene - define location and env settings.
       // Also making bg transparent.
       var view = new SceneView({
           id: "view",
           container: "viewDiv",
           map: map,
           alphaCompositingEnabled: true,
           qualityProfile: "high",
           camera: {
               position: [-4.49292254, 48.38118005, 29.41383],
               heading: 250.18,
               tilt: 87.91,
               fov: 100
           },
           environment: {
               background: {
                   type: "color",
                   color: [255, 252, 244, 0] // making background transparent
               },
               lighting: {
                   date: new Date("July 1, 2008 10:00:00 GMT"),
                   directShadowsEnabled: true,
                   ambientOcclusionEnabled: true
               },
               starsEnabled: false,
               atmosphereEnabled: false
           }
       });

       // set position of camera when ready
       window.requestAnimationFrame(update);

       // on camera update
       watchUtils.watch(view, "camera", function() {
           update();

           if (view.camera.position.z > 140000) {
               view.environment.background.color = [255, 252, 244, 1];
           } else {
               view.environment.background.color = [255, 252, 244, 0];
           }
       });

       function update() {
           updatePanoPosition(view.camera)
       };

       function updatePanoPosition(camera) {
           // updating panorama behind
           viewer.lookAt(camera.tilt - 90, camera.heading, 100, true, {}, {});
       };

       // initiating viewer
       // https://pannellum.org/documentation/overview
       var viewer = pannellum.viewer('panorama', {
           "type": "equirectangular",
           "showZoomCtrl": false,
           "showFullscreenCtrl": false,
           "panorama": "", // ADD IMAGE URL HERE****
           "autoLoad": true,
           "hfov": 100
       });
   });