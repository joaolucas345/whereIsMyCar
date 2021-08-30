const car = (iconFeature , createStyle , map) => {
    iconFeature.set('style', createStyle('data/personicon.png', undefined));
    const selectStyle = {};
    const select = new ol.interaction.Select({
      style: function (feature) {
        const image = feature.get('style').getImage().getImage();
        if (!selectStyle[image.src]) {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0, image.width, image.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          for (let i = 0, ii = data.length; i < ii; i = i + (i % 4 == 2 ? 2 : 1)) {
            data[i] = 255 - data[i];
          }
          context.putImageData(imageData, 0, 0);
          selectStyle[image.src] = createStyle(undefined, canvas);
        }
        return selectStyle[image.src];
      },
    });
    map.addInteraction(select);
    
    map.on('pointermove', function (evt) {
      map.getTargetElement().style.cursor = map.hasFeatureAtPixel(evt.pixel)
        ? 'pointer'
        : '';
    });
    }

const me = (iconFeature , createStyle , map) => {
      iconFeature.set('style', createStyle('data/caricon.png', undefined));
      const selectStyle = {};
      const select = new ol.interaction.Select({
        style: function (feature) {
          const image = feature.get('style').getImage().getImage();
          if (!selectStyle[image.src]) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0, image.width, image.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            for (let i = 0, ii = data.length; i < ii; i = i + (i % 4 == 2 ? 2 : 1)) {
              data[i] = 255 - data[i];
            }
            context.putImageData(imageData, 0, 0);
            selectStyle[image.src] = createStyle(undefined, canvas);
          }
          return selectStyle[image.src];
        },
      });
      map.addInteraction(select);
      
      map.on('pointermove', function (evt) {
        map.getTargetElement().style.cursor = map.hasFeatureAtPixel(evt.pixel)
          ? 'pointer'
          : '';
      });
      }