   require([
       "esri/Map",
       "esri/views/SceneView",
       "esri/layers/SceneLayer",
       "esri/widgets/Daylight",
       "esri/widgets/Expand"
   ], function(Map, SceneView, SceneLayer, Daylight, Expand) {

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

       // on drag/move
       view.on("drag", function(newValue) {
           window.requestAnimationFrame(update);

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
       // https://pannellum.org/documentation
       var viewer = pannellum.viewer('panorama', {
           "type": "equirectangular",
           "showZoomCtrl": false,
           "showFullscreenCtrl": false,
           "panorama": "https://live.staticflickr.com/1821/28156948207_717d9531a8_6k.jpg", // ADD PANO IMAGE HERE. E.G. SAMPLE BELOW
           "autoLoad": true,
           "hfov": 100
       });

       // image from
       //https://www.flickr.com/photos/gdavidson/28156948207/in/photolist-JU8HJg-nT71gf-xQrbue-4Y6eHi-219PyWg-21BxL7Y-28uSJBB-N4KSZA-TjkWhS-m9sMw-27f6A8W-Evj9DT-EB7JY7-24KhwW4-6zEKzq-MrABMX-cJ9Xms-7AEmLt-24NUuA3-JSbPkJ-vSNqrG-s6s6bD-23b6KQX-DmZZVy-68nuJ7-dgQsxW-GNkpH6-d4ax9j-LwMbPd-xqVBEU-bLqXhP-cJXJKJ-Eoj4yU-Q3EzPE-r8bp5e-YDK3LD-FTVPUF-28HDEEX-njjJ3e-Cao6PJ-2foZRYM-KwEzvH-Y7exG8-oGLcWE-Jn5VFM-VP9DhD-XDqBh9-2af2YNZ-ZF2tH4-VAd9H1

   });