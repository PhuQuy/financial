function initMap() {
    // Styles a map in night mode.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 10.872285, lng: 106.682888},
        zoom: 12,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "hue": "#ffb500"
                    },
                    {
                        "lightness": "54"
                    },
                    {
                        "saturation": "-61"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#444444"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#46bcec"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ]
    });
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(10.873800, 106.732829),
        map: map,
        title: 'Hello world',
        icon: 'images/local.png',
    });

    var contentString = '<div class="show_da_map">'+
                            '<div class="bds_show_da_image"><span class="bds_show_da_gia">1,28 - 1,85 Tỷ VNĐ</span></div>'+
                            '<div class="bds_show_da_info">'+
                                '<h2 class="bds_show_da_name">STown Thủ Đức</h2>'+
                                '<h3 class="bds_show_da_local">2A Bình Chiểu, Thủ Đức</h3>'+
                                '<div class="bds_show_da_size">'+
                                    '<span class="bds_show_da_size_s">Phòng ngủ: 2 - 3</span>'+
                                    '<span class="bds_show_da_size_s">Phòng tắm: 2</span>'+
                                    '<span class="bds_show_da_size_s">Ban công: 2</span>'+
                                    '<span class="bds_show_da_size_s">Diện tích: 61m2 - 81m2</span>'+
                                '</div>'+
                                '<h3 class="bds_show_da_kinds">Căn hộ trung cư</h3>'+
                            '</div>'+
                        '</div>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 300
    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
}