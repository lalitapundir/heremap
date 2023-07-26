import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { environment } from 'src/environments/environment.development';
declare var H: any;  

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  title = 'HereMapDemo';  
  
  @ViewChild("map", { static: true })
  public mapElement!: ElementRef;  
  
  public lat: any = '39.9259';  
  public lng: any = '75.1196';  
  
  public width: any = '1000px';  
  public height: any = '600px';  
  
  private platform: any;  
  private map: any;  
  
  public zoom:any = 6;

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
      
  }  

  addMarkersToMap() {
    var newYorkMarker = new H.map.Marker({lat:43.000000, lng:-75.000000},{data:"New York"});
    this.map.addObject(newYorkMarker);

    var floridaMarker = new H.map.Marker({lat:	27.994402, lng: 	-81.760254},{data:"Florida"});
    this.map.addObject(floridaMarker);

    var californismarker = new H.map.Marker({lat:36.778259, lng:-119.417931},{data:"California"});
    this.map.addObject(californismarker);

    var indianaMarker = new H.map.Marker({lat:	40.273502, lng: 	-86.126976},{data:"Indiana"});
    this.map.addObject(indianaMarker);

    var coloradoMarker = new H.map.Marker({lat:39.113014, lng:-105.358887},{data:"Colorado"});
    this.map.addObject(coloradoMarker);

    var texasMarker = new H.map.Marker({lat:31.000000, lng:-100.000000},{data:"Texas"});
    this.map.addObject(texasMarker);
}
  
  

  moveMapToBerlin(){
   // this.map.setCenter({lat:52.5159, lng:13.3777});
    //this.map.setZoom(14);
  }
  
  
  public ngAfterViewInit() {  

    // Obtain the default map types from the platform object:
    var defaultLayers = this.platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.vector.normal.map,
      {
        zoom: this.zoom,
        center: { lat: 31.000000, lng: -100.000000 },
       // engineType: H.map.render.RenderEngine.EngineType.P2D
      });
 


        // add a resize listener to make sure that the map occupies the whole container
    window.addEventListener('resize', () => this.map.getViewPort().resize());

    //Step 3: make the map interactive
    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

    // Create the default UI components
    var ui = H.ui.UI.createDefault(this.map, defaultLayers);

    // Now use the map as required...
      //this.moveMapToBerlin();
         // Create a marker for the start point:

         this.addMarkersToMap();

  }  



  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //     requestAnimationFrame(() => this.map.getViewPort().resize());
  // }

}
