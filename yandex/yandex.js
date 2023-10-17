var yandexMap;

function init() {
 /* Ti.App.addEventListener('app:add_annotation', tiApp_addAnnotation);
  Ti.App.addEventListener('app:add_annotations', tiApp_addAnnotations);
  Ti.App.addEventListener('app:remove_annotation', tiApp_removeAnnotation);
  Ti.App.addEventListener('app:remove_annotations', tiApp_removeAnnotations);
  Ti.App.addEventListener('app:remove_all_annotations', tiApp_removeAllAnnotations);*/
  Ti.App.addEventListener('app:add_map', tiApp_addMap);
 // Ti.App.addEventListener('app:pan_map', tiApp_panMap);
  Ti.App.addEventListener('app:forward_search', tiApp_forwardSearch);

  buildMap();
}

function buildMap() {
  if (window.innerWidth == 0) {
    Ti.App.addEventListener('app:resize', tiApp_resizeMap);
    return;
  }

  resize(window.innerWidth, window.innerHeight);

  ymaps.ready(mapReady);
}

function resize(width, height) {
  var mapContainer = document.getElementById('yandexmap');
  mapContainer.style.width = "200px"//window.innerWidth + 'px';
  mapContainer.style.height = "200px"//window.innerHeight + 'px';
}

function mapReady() {
  Ti.App.fireEvent('app:container_is_ready');
}

function tiApp_forwardSearch(event) {
  ymaps.geocode("Питер", {
    /**
     * Опции запроса
     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geocode.xml
     */
    // Сортировка результатов от центра окна карты.
    // boundedBy: yandexMap.getBounds(),
    // strictBounds: true,
    // Вместе с опцией boundedBy будет искать строго внутри области, указанной в boundedBy.
    // Если нужен только один результат, экономим трафик пользователей.
    results: 1
  }).then(function (res) {

  }, function (error) {
    console.log("Error!!!: " + JSON.stringify(error))
  });
}

function tiApp_addMap(event) {
  yandexMap = new ymaps.Map('yandexmap', {
    center: [event.latitude, event.longitude],
    zoom: event.zoom
  });

  Ti.App.fireEvent('app:map_is_ready');
}

function tiApp_resizeMap(event) {
  Ti.App.removeEventListener('app:resize', tiApp_resizeMap);

  buildMap();
}

function body_loadHandler() {
  init();
}