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

  
  

  
  
  public ngAfterViewInit() {  

    // Obtain the default map types from the platform object:
    var defaultLayers = this.platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    var map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.vector.normal.map,
      {
        zoom: 10,
        center: { lat: 52.5, lng: 13.4 }
      });
 


    // let pixelRatio = window.devicePixelRatio || 1;  
    // let defaultLayers = this.platform.createDefaultLayers({  
    //   tileSize: pixelRatio === 1 ? 256 : 512,  
    //   ppi: pixelRatio === 1 ? undefined : 320  
    // });  
  
    
    //   // Step 2: initialize a map - this map is centered over Berlin
    //   this.map = new H.Map(this.mapElement.nativeElement,  
    //   defaultLayers.normal.map, { zoom: 4, pixelRatio: pixelRatio });  

  
    // var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));  
    // var ui = H.ui.UI.createDefault(this.map, defaultLayers);  
  
    // this.map.setCenter({ lat: this.lat, lng: this.lng });  
    // this.map.setZoom(1);  

    //  // create map objects
    //  var toronto = new H.map.Marker({lat:43.7,  lng:-79.4}),
    //  boston = new H.map.Marker({lat:42.35805, lng:-71.0636}),
    //  washington = new H.map.Marker({lat:38.8951, lng:-77.0366}),
    //  group = new H.map.Group();

    // // add markers to the group
    // group.addObjects([toronto, boston, washington]);
    // this.map.addObject(group);


    // const landmarks = [
    //   {name: 'Notre-Dame Cathedral', lat: 49.610364, lng: 6.129416, label: 'NDC'},
    //   {name: 'Grand Ducal Palace',lat: 49.611204, lng: 6.130720, label: 'GDP'},
    //   {name: 'Casemates du Bock', lat: 49.611847, lng: 6.131925, label: 'CdB'},
    //   {name: 'Adolphe Bridge', lat: 49.6083, lng: 6.127109, label: 'AB'},
    // ];

    // landmarks.forEach(landmark => {
    //   // For each marker, select the icon based on the corresponding landmark label:
    //   const icon = new H.map.Icon('/assets/images/marker-' + landmark.label + '.png',
    //     // Adjust the marker size to your needs: 
    //     {size: { w: 80, h: 80 }
    //       });
    //   const marker = new H.map.Marker({ lat: landmark.lat, lng: landmark.lng }, 
    //     { data: landmark.name }); //, icon: icon
    //     this.map.addObject(marker);
    // });

  //   setTimeout(function () {
  //     window.dispatchEvent(new Event('resize'));
  // }, 500);

  }  

  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //     requestAnimationFrame(() => this.map.getViewPort().resize());
  // }

}
