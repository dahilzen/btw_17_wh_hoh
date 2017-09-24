function main() {

    var polygon;

    var map_object = L.map('map', {
        zoomControl: false,
        attributionControl: false,
        legends: false,
        layer_selector: false,
    }).setView([49.1996110, 9.7929980], 10);

    // Zoomfunktion komplett deaktivieren
    map_object.touchZoom.disable();
    map_object.doubleClickZoom.disable();
    map_object.scrollWheelZoom.disable();
    map_object.keyboard.disable();

    var sublayers = [];

    // Leeren TileLayer hinzufügen

    L.tileLayer('', {
        attribution: 'Recherche und Code: <a href="https://www.twitter.com/dahilzen">David Hilzendegen</a> | Daten: <a href="http://www.statistik-bw.de/">Statistisches Landesamt</a>'
    }).addTo(map_object);

    // cartodb createLayer
    cartodb.createLayer(map_object, 'https://dahilzen.carto.com/api/v2/viz/b0d4c150-a174-11e7-8f9c-0e0efa15ad62/viz.json', {
            legends: false,
            cartodb_logo: false,
            mobile_layout: true,
            force_mobile: $(window).width() < 620,
            loaderControl: false,
        })
        .addTo(map_object)
        .on('done', function(layer) {
            // set interaction of the CartoDB layer (allow you to click on it)
            layer.setInteraction(true);

            // add sublayers & change the query for the first layer  
            var subLayerOptions = {
                sql: "SELECT * FROM result_hoh_1",
                cartocss: '#result_hoh_1{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:.5;line-opacity:1}#result_hoh_1 [cdu_zweit<=49.6]{polygon-fill:#000;polygon-opacity:1}#result_hoh_1 [cdu_zweit<=38.4]{polygon-fill:#000;polygon-opacity:.8}#result_hoh_1 [cdu_zweit<=35.9]{polygon-fill:#000;polygon-opacity:.6}#result_hoh_1 [cdu_zweit<=33.9]{polygon-fill:#000;polygon-opacity:.4}#result_hoh_1 [cdu_zweit<=31.4]{polygon-fill:#000;polygon-opacity:.2}'
            }

            var sublayer = layer.getSubLayer(0);

            sublayer.infowindow.set('template', $('#infowindow_template').html());

            sublayer.set(subLayerOptions);

            sublayers.push(sublayer);

            //we define the queries that will be performed when we click on the buttons, by modifying the SQL of our layer
            var LayerActions = {
                cdu: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM result_hoh_1",
                        cartocss: '#result_hoh_1{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:.5;line-opacity:1}#result_hoh_1 [cdu_zweit<=49.6]{polygon-fill:#000;polygon-opacity:1}#result_hoh_1 [cdu_zweit<=38.4]{polygon-fill:#000;polygon-opacity:.8}#result_hoh_1 [cdu_zweit<=35.9]{polygon-fill:#000;polygon-opacity:.6}#result_hoh_1 [cdu_zweit<=33.9]{polygon-fill:#000;polygon-opacity:.4}#result_hoh_1 [cdu_zweit<=31.4]{polygon-fill:#000;polygon-opacity:.2}'
                    });
                    return true;
                },
                spd: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM result_hoh_1",
                        cartocss: '#result_hoh_1{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:.5;line-opacity:1}#result_hoh_1 [spd_zweit<=20.6]{polygon-fill:#eb0000;polygon-opacity:1}#result_hoh_1 [spd_zweit<=17.55]{polygon-fill:#eb0000;polygon-opacity:.8}#result_hoh_1 [spd_zweit<=16.35]{polygon-fill:#eb0000;polygon-opacity:.6}#result_hoh_1 [spd_zweit<=15.2]{polygon-fill:#eb0000;polygon-opacity:.4}#result_hoh_1 [spd_zweit<=14.2]{polygon-fill:#eb0000;polygon-opacity:.2}'
                    });
                    return true;
                },
                gruene: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM result_hoh_1",
                        cartocss: '#result_hoh_1{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:.5;line-opacity:1}#result_hoh_1 [gruene_zweit<=17.3]{polygon-fill:#5cb813;polygon-opacity:1}#result_hoh_1 [gruene_zweit<=14.1]{polygon-fill:#5cb813;polygon-opacity:.8}#result_hoh_1 [gruene_zweit<=12.1]{polygon-fill:#5cb813;polygon-opacity:.6}#result_hoh_1 [gruene_zweit<=11]{polygon-fill:#5cb813;polygon-opacity:.4}#result_hoh_1 [gruene_zweit<=9.4]{polygon-fill:#5cb813;polygon-opacity:.2}'
                    });
                    return true;
                },
                linke: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM result_hoh_1",
                        cartocss: '#result_hoh_1{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:.5;line-opacity:1}#result_hoh_1 [linke_zweit<=8.8]{polygon-fill:#540fc6;polygon-opacity:1}#result_hoh_1 [linke_zweit<=6.4]{polygon-fill:#540fc6;polygon-opacity:.8}#result_hoh_1 [linke_zweit<=5.6]{polygon-fill:#540fc6;polygon-opacity:.6}#result_hoh_1 [linke_zweit<=4.9]{polygon-fill:#540fc6;polygon-opacity:.4}#result_hoh_1 [linke_zweit<=4.1]{polygon-fill:#540fc6;polygon-opacity:.2}'
                    });
                    return true;
                },
                fdp: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM result_hoh_1",
                        cartocss: '#result_hoh_1{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:.5;line-opacity:1}#result_hoh_1 [fdp_zweit<=18.1]{polygon-fill:#ecbd00;polygon-opacity:1}#result_hoh_1 [fdp_zweit<=14.7]{polygon-fill:#ecbd00;polygon-opacity:.8}#result_hoh_1 [fdp_zweit<=13.5]{polygon-fill:#ecbd00;polygon-opacity:.6}#result_hoh_1 [fdp_zweit<=12.8]{polygon-fill:#ecbd00;polygon-opacity:.4}#result_hoh_1 [fdp_zweit<=11.7]{polygon-fill:#ecbd00;polygon-opacity:.2}'
                    });
                    return true;
                },
                afd: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM result_hoh_1",
                        cartocss: '#result_hoh_1{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:.5;line-opacity:1}#result_hoh_1 [afd_zweit<=20.9]{polygon-fill:#00baff;polygon-opacity:1}#result_hoh_1 [afd_zweit<=15.9]{polygon-fill:#00baff;polygon-opacity:.8}#result_hoh_1 [afd_zweit<=14.9]{polygon-fill:#00baff;polygon-opacity:.6}#result_hoh_1 [afd_zweit<=13.1]{polygon-fill:#00baff;polygon-opacity:.4}#result_hoh_1 [afd_zweit<=12.1]{polygon-fill:#00baff;polygon-opacity:.2}'
                    });
                    return true;
                },
            }

            $('.button').click(function() {
                $('.button').removeClass('selected');
                $(this).addClass('selected');
                //this gets the id of the different buttons and calls to LayerActions which responds according to the selected id
                LayerActions[$(this).attr('id')]();
            });

            $('#selector').change(function() {
                LayerActions[$(this).val()]();
            });

            // when the CartoDB layer is clicked...
            layer.on('featureClick', function(e, latlng, pos, data) {
                // data1 stores the cartodb_id value of the selected polygon
                data1 = data.cartodb_id;

                // if Leaflet polygon is added on the map, remove it
                if (map_object.hasLayer(polygon)) {
                    map_object.removeLayer(polygon)
                    console.log("removed")
                }

                // use SQL API to extract the attribute values from the selected polygons
                var sql = new cartodb.SQL({
                    user: 'dahilzen'
                });
                // select the attribute tables to extract from CartoDB table
                sql.execute("SELECT ST_asGeoJSON(the_geom) as geom FROM result_hoh_1 WHERE cartodb_id IN (" + data1 + ")")
                    .done(function(data) {

                        var geom = data.rows[0].geom;
                        polygon = L.geoJson(JSON.parse(geom), {
                            style: {
                                color: "#fff", // color of stroke line
                                weight: 5, // width of stroke line
                                //fillColor: "blue", // define color of polygon
                                fill: true // set polygon
                            }

                        });
                        // add leaflet polygon on the map
                        map_object.addLayer(polygon);

                    });

            });

        });

}

window.onload = main;