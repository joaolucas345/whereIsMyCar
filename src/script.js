const main = (pos) => {
  function createStyle(src, img) {
    return new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.2, 0.5],
        crossOrigin: 'anonymous',
        src: src,
        img: img,
        imgSize: img ? [img.width, img.height] : undefined,
      }),
    });
  }
  
  const carFeature = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([pos.longitude, pos.latitude])));
  const meFeature = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([pos.longitude - 10, pos.latitude - 10])));

  const map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
      new ol.layer.Vector({
        style: function (feature) {
          return feature.get('style');
        },
        source: new ol.source.Vector({features: [carFeature]}),
      }),
      new ol.layer.Vector({
        style: function (feature) {
          return feature.get('style');
        },
        source: new ol.source.Vector({features: [meFeature]}),
      }),
    ],
    target: document.getElementById('map'),
    view: new ol.View({
      center: ol.proj.fromLonLat([pos.longitude, pos.latitude]),
      zoom: 10,
    }),
  });
  car(carFeature , createStyle , map)
  me(meFeature , createStyle , map)
}

navigator.geolocation.getCurrentPosition(currentPos => {
  main(currentPos.coords)
})