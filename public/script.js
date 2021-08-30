const main = async (pos) => {
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

  const API_URL = "http://192.168.1.5:3001"
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':"*"
}

  const carInstance = []
  let carsf = await fetch(`${API_URL}/car`, {method:"GET" , headers})//[{name:"testcar"},{name:"testcar"},{name:"testcar"},{name:"testcar"},{name:"testcar"},{name:"testcar"},{name:"testcar"},{name:"testcar"},{name:"testcar"},{name:"testcar"},{name:"testcar"},{name:"testcar"},{name:"testcar"}]
  carsf= await carsf.json()
  carsf.map(p => {
    let realPos = p.pos.substring(1 , p.pos.length - 1)
    const [longitude , latitude] = realPos.split(",")
    carInstance.push([parseInt(longitude) , parseInt(latitude)])
  })
  const carFeature = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([pos.longitude, pos.latitude])));
  const meFeature = []//new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([pos.longitude - 10, pos.latitude - 10])));
  carInstance.map(inst => {
    const toPush = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat(inst)));
    meFeature.push(toPush)
  })

  const MapConf = {
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
      new ol.layer.Vector({
        style: function (feature) {
          return feature.get('style');
        },
        source: new ol.source.Vector({features: [carFeature]}),
      })
    ]
  }

  meFeature.map(feat => {
    MapConf.layers.push(
      new ol.layer.Vector({
        style: function (feature) {
          return feature.get('style');
        },
        source: new ol.source.Vector({features: [feat]}),
      })
    )
  })

  const map = new ol.Map({
    layers: MapConf.layers,
    target: document.getElementById('map-div'),
    view: new ol.View({
      center: ol.proj.fromLonLat([pos.longitude, pos.latitude]),
      zoom: 10
    }),
  });
  car(carFeature , createStyle , map)
  meFeature.map(feat => {
    me(feat , createStyle , map)
  })
}

//navigator.geolocation.getCurrentPosition(currentPos => {
  const currentPos = {
    coords:{
      latitude:2,
      longitude:2
    }
  }
  main(currentPos.coords)
//} , () => {}, {enableHighAccuracy:true})