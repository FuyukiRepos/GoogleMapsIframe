//import { decode } from "@here/flexpolyline";


window.onload = function () {
  fetch("/api/googleapikey")
    .then((response) => response.json())
    .then((data) => {
      const apiKey = data.key;
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.onload = initMap; 
      document.head.appendChild(script);
    })
    .catch((error) => console.error("Error fetching Google API key:", error));
};

function initMap() {
  // Make sure the map container exists
  const container = document.getElementById("map");

  if (container) {
    const mapOptions = {
      center: { lat: -37.8148832456391, lng: 144.9590648654127 },
      zoom: 9,
      gestureHandling: "greedy",
      controlSize: 30,
      mapId: "29848078b3bd095",
    };

    // Initialize the map inside the container
    const map = new google.maps.Map(container, mapOptions);

    // Get the marker points from the URL
    const urlParams = new URLSearchParams(window.location.search);

    // Extract additional coordinates for HERE Maps
    const coordinates = [];
    for (let i = 1; i <= 17; i++) {
      const point = urlParams.get(`point${i}`);
      coordinates.push(point ? point.trim() : ""); // Push the point or an empty string
    }
    
    if (coordinates.filter(coord => coord !== "").length > 0) {
      addMarkers(map, ...coordinates);
    }  
    
    window.addEventListener("message", function(event) {
    // Ignore messages that don't have polyline or type properties
    if (!event.data.polyline || !event.data.type) return;
  
    const { polyline, type } = event.data;
    console.log("iframe", event.data);

    let color = type === "polyline2" ? "#8c1e94" : "#2149f4";
    const polylineArray = typeof polyline === 'string' ? polyline.split(",") : polyline;

    drawPolyline(map, polylineArray, color);
});
    
    
    const states = [];
    for (let i = 1; i <= 4; i++) { 
      const state = urlParams.get(`state${i}`);
      if (state) {
        states.push(state.trim());
      }
    }

    if (states.length === 4) {
      drawrailline(map, states[0], states[1], states[2], states[3]);
    }
   
    
    /**
    const rateId = urlParams.get("rateid"); 
    if (rateId) {
  fetch(`/here/${rateId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error fetching polylines: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      const polylines = [data.polyline1, data.polyline2, data.polyline3].filter(polyline => polyline);
      if (polylines.length > 0) {
        drawPolyline(map, polylines, "#2149f4"); // Draw polylines on the map
      }
    })
    .catch((error) => {
      console.error('Error fetching polylines:', error);
    });
}
*/
  }
}

// Define the async addMarkers function
async function addMarkers(
  map, // Pass the map instance as an argument
  point1,
  point2,
  point3,
  point4,
  point5,
  point6,
  point7,
  point8,
  point9,
  point10,
  point11,
  point12,
  point13,
  point14,
  point15,
  point16,
  point17
) {
  const coordinates_list = [
    point1,
    point2,
    point3,
    point4,
    point5,
    point6,
    point7,
    point8,
    point9,
    point10,
    point11,
    point12,
    point13,
    point14,
    point15,
    point16,
    point17,
  ];

  const bounds = new google.maps.LatLngBounds();

  const parseCoordinate = (coordinateString) => {
    if (!coordinateString || coordinateString.trim() === "") return null;
    const [latStr, lngStr] = coordinateString
      .split(",")
      .map((part) => part.trim());
    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);
    return { lat, lng };
  };

  // Import the Marker library from Google Maps
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // Indices of points that should have the custom icon
  const circleIconIndices = [0, 6, 7, 8, 9, 10, 16];

  // Loop through each coordinate in the list
  coordinates_list.forEach((coord, index) => {
    const position = parseCoordinate(coord);

    if (position) {
      const circleMarker = document.createElement("div");
      circleMarker.style.width = "11.5px";
      circleMarker.style.height = "11.5px";
      circleMarker.style.backgroundColor = "white";
      circleMarker.style.borderRadius = "50%";
      circleMarker.style.border = "2px solid #0505b5";
      circleMarker.style.opacity = "1";

      const marker = new AdvancedMarkerElement({
        map,
        position,
        content: circleIconIndices.includes(index)
          ? circleMarker
          : new google.maps.marker.PinElement({
              scale: 0.65,
              //glyph: "S",
              glyphColor: "white",
              //background: "#0f548c",
              borderColor: "white"
            }).element,
      });

      bounds.extend(position);
    }
  });

  // Adjust map view to fit all markers
  map.fitBounds(bounds);
}

// Function to draw polylines on the map
function drawPolyline(map, encodedPolylines, color) {
  encodedPolylines.forEach((encodedPolyline) => {
    if (encodedPolyline) {
      const decodedPath = flexpolyline.decode(encodedPolyline);
      const googlePath = decodedPath.polyline.map(
        ([lat, lng]) => new google.maps.LatLng(lat, lng)
      );
      
      const polyline = new google.maps.Polyline({
        path: googlePath,
        geodesic: true,
        strokeColor: color,
        strokeOpacity: 1.0,
        strokeWeight: 3.5,
        map: map,
      });

      polyline.setMap(map);
    }
  });
}

function drawrailline (map, state1, state2, state3, state4) {
  
  const raillist = [
    {
      name: "Pacific National (VIC)",
      latitude: -37.802185091376955,
      longitude: 144.9178925971561,
      address: "Gate R, 376 Dynon Rd, West Melbourne VIC 3003, Australia",
      state: "VIC",
    },
    {
      name: "Pacific National (NSW)",
      latitude: -33.88867674844518,
      longitude: 151.04340999886549,
      address: "20 Dasea St, Chullora NSW 2190, Australia",
      state: "NSW",
    },
    {
      name: "Pacific National (QLD)",
      latitude: -27.573377279607588,
      longitude: 153.02920288332237,
      address: "8 Kerry Rd, Acacia Ridge QLD 4110, Australia",
      state: "QLD",
    },
    {
      name: "Pacific National (SA)",
      latitude: -34.8680380244535,
      longitude: 138.576349810541,
      address: "Pedder Cres, Regency Park SA 5010, Australia",
      state: "SA",
    },
    {
      name: "Pacific National (WA)",
      latitude: -31.983456369793245,
      longitude: 115.95858106811427,
      address: "4 Fenton St, Kewdale WA 6105, Australia",
      state: "WA",
    },
  ];
  
  const getCoordinates = (state) => {
    const location = raillist.find(item => item.state === state);
    return location ? { lat: location.latitude, lng: location.longitude } : null;
  };

  // Get coordinates for the states
  const coord1 = getCoordinates(state1);
  const coord2 = getCoordinates(state2);
  const coord3 = getCoordinates(state3);
  const coord4 = getCoordinates(state4);
  
  
  const lineSymbol = {
      path: "M 0,-1 0,1", 
      strokeOpacity: 1,
      scale: 2.5
    };
  
  if (coord1 && coord2) {
    const dashedLine1 = new google.maps.Polyline({
      path: [coord1, coord2],
      strokeColor: "#ff6600",
      strokeOpacity: 0,
      icons: [
        {
          icon: lineSymbol,
          offset: "0",
          repeat: "15px",
        },
      ],
      map: map,
    });
  }

  if (coord3 && coord4 && coord3 != coord1 && coord4 != coord2) {
    const dashedLine2 = new google.maps.Polyline({
      path: [coord3, coord4],
      strokeColor: "#ff6600",
      strokeOpacity: 0,
      icons: [
        {
          icon: lineSymbol,
          offset: "0",
          repeat: "15px",
        },
      ],
      map: map,
    });
  }
}

