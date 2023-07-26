import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { environment } from 'src/environments/environment.development';
declare var H: any; 
@Component({
  selector: 'app-truckroad',
  templateUrl: './truckroad.component.html',
  styleUrls: ['./truckroad.component.css']
})
export class TruckroadComponent {

   
  @ViewChild("map", { static: true })
  public mapElement!: ElementRef;  

   
  @ViewChild("panel", { static: true })
  public panelElement!: ElementRef;  

  private platform: any;  
  private map: any;  
  

  public constructor() {  
      
  }  
  public ngOnInit() {  
    this.platform = new H.service.Platform({  
      'apikey': environment.apiKey
     // "app_id": this._appId
      //app_code:  this._appCode,
      //useCIT: true,
     // useHTTPS: true 
    });  
    var defaultLayers = this.platform.createDefaultLayers();
    
    // Step 2: initialize a map - this map is centered over Berlin
    this.map = new H.Map( this.mapElement.nativeElement,
       // Set truck restriction layer as a base map
    defaultLayers.vector.normal.truck,{
      center: {lat: 40.745390, lng: -74.022917},
      zoom: 13.2,
      pixelRatio: window.devicePixelRatio || 1
      });
      
  }  

  calculateRouteFromAtoB() {
    var router = this.platform.getRoutingService(null, 8),
        routeRequestParams = {
         
          routingMode: 'fast',
          transportMode: 'truck',
          origin: '52.5160,13.3779', // Brandenburg Gate
          destination: '52.5206,13.3862', // Friedrichstraße Railway Station
          return: 'polyline,turnByTurnActions,actions,instructions,travelSummary',
          units: 'imperial',
        spans: 'truckAttributes'
        };
  
    router.calculateRoute(
      routeRequestParams,
      this.onSuccess,
      function(error:any) {
        alert(error.message);
      });

      // The green route showing a truck route with a trailer
      router.calculateRoute(Object.assign(routeRequestParams, {
    'truck[axleCount]': 4,
  }), {
    strokeColor: 'rgba(25, 150, 10, 0.7)',
    lineWidth: 7
  });

  // The violet route showing a truck route with a trailer
  router.calculateRoute(Object.assign(routeRequestParams, {
        'truck[axleCount]': 5,
        'truck[shippedHazardousGoods]': 'flammable'
      }), {
        strokeColor: 'rgba(255, 0, 255, 0.7)',
        lineWidth: 5
      });
    
   
  }


  // function calculateRoute (router, params, style) {
  //   router.calculateRoute(params, function(result) {
  //     addRouteShapeToMap(style, result.routes[0]);
  //   }, console.error);
  // }
  



  onError(error: any) {
    alert('Can\'t reach the remote server');
  }
 

  public ngAfterViewInit() {

   
   
    // add a resize listener to make sure that the map occupies the whole container
    window.addEventListener('resize', () => this.map.getViewPort().resize());
    
    // Step 3: make the map interactive
    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

    this.calculateRouteFromAtoB();

  }





 
  onSuccess = (result: any) =>{
    console.log("result",result);
     // ensure that at least one route was found
  if (result.routes.length) {

    // Pick the first route from the response:
  var route = result.routes[0];
 
    this.addSummaryToPanel(route);

    result.routes[0].sections.forEach((section:any) => {
         // Create a linestring to use as a point source for the route line
        let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

        // // Create a polyline to display the route:
        // let routeLine = new H.map.Polyline(linestring, {
        //   style: { strokeColor: 'blue', lineWidth: 3 }
        // });

        


        //Within the onResult callback:

// Create an outline for the route polyline:
var routeOutline = new H.map.Polyline(linestring, {
  style: {
    lineWidth: 10,
    strokeColor: 'rgba(0, 128, 255, 0.7)',
    lineTailCap: 'arrow-tail',
    lineHeadCap: 'arrow-head'
  }
});
// Create a patterned polyline:
var routeArrows = new H.map.Polyline(linestring, {
  style: {
    lineWidth: 10,
    fillColor: 'white',
    strokeColor: 'rgba(255, 255, 255, 1)',
    lineDash: [0, 2],
    lineTailCap: 'arrow-tail',
    lineHeadCap: 'arrow-head' }
  }
);
// create a group that represents the route line and contains
// outline and the pattern
var routeLine = new H.map.Group();
routeLine.addObjects([routeOutline, routeArrows]);


// Create a marker for the start point:
let startMarker = new H.map.Marker(section.departure.place.location);

// Create a marker for the end point:
let endMarker = new H.map.Marker(section.arrival.place.location);

// Add the route polyline and the two markers to the map:
this.map.addObjects([routeLine, startMarker, endMarker]);

        // Set the map's viewport to make the whole route visible:
        this.map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});
    });
  }
  
   
  }

  addSummaryToPanel(route:any){
    let duration = 0,
        distance = 0;
  
    route.sections.forEach((section:any) => {
      distance += section.travelSummary.length;
      duration += section.travelSummary.duration;
    });
  
    var summaryDiv = document.createElement('div'),
     content = '';
     content += '<b>Total distance</b>: ' + distance  + 'm. <br/>';
     content += '<b>Travel Time</b>: ' + this.toMMSS(duration);
  
  
    summaryDiv.style.fontSize = 'small';
    summaryDiv.style.marginLeft ='5%';
    summaryDiv.style.marginRight ='5%';
    summaryDiv.innerHTML = content;
    this.panelElement.nativeElement.appendChild(summaryDiv);
  }

  toMMSS = (duration:Number)=> {
    let number:any = duration;
    return  Math.floor(number / 60)  +' minutes '+ (number % 60)  + ' seconds.';
  }
  
    
   
}
