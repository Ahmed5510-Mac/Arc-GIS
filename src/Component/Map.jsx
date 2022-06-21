import React, { useRef, useEffect } from 'react';
import { loadModules } from 'esri-loader';
import {useLocation} from 'react-router-dom';
import './reg.css'
import { useNavigate } from 'react-router-dom';
function Map() {
  const navigate=useNavigate()
  const location=useLocation();
  const mapElement = useRef(null);
  useEffect(
    () => {
      let view;
      loadModules(["esri/views/MapView", "esri/WebMap", "esri/layers/GeoJSONLayer","esri/widgets/Bookmarks"], {
        css: true
      }).then(([MapView, webMap, GeoJSONLayer,Bookmarks]) => {
        const BOOKMARK_KEY = "arcgis-local-bookmarks";
        let existingData = []; 
        // *? ----------get bookmarks from localstorage ---------------
                 const existingBookmarks = localStorage.getItem(BOOKMARK_KEY) || null;
                  if (existingBookmarks) {
                    existingData = JSON.parse(existingBookmarks);
                  }
        // *?-----get  anew map  to be used in the overview "view-------
            const webmap = new webMap({
                  basemap: 'topo-vector',
                })
                 //*TODO:===========================render & visualVariables====================================  
                   const renderer ={
                       type: "simple",
                       field: "arrest_charge",
                       symbol: {
                         type: "simple-marker",
                         color: "orange",
                         outline: {
                           color: "white"
                         }
                       },
                       visualVariables: [
                         {
                           type: "size",
                           field: "arrest_charge",
                           stops: [
                             {
                               value: "12000",
                               color: "#493D26"
                             },
                             
                             
                           ]
                         }
                       ]
                   };
                 //*TODO:============================View===================================   
                
                // **Create another Map, to be used in the overview "view"
                view = new MapView({
                    map: webmap, 
                    center: [-83.08380,42.366000],
                    zoom:11,
                    //use the ref as acontainer 
                    container: mapElement.current
                }) 
                 // *TODO:=========================geoJSON======================================   
                //  *? ----------template point--------------
                 const template = {
                  title: "KH & A info",
                  content:" category:{offense_description} at{address} arr =>{arrest_charge}"
              }
                //  *? --------new layer point orange -------
                const geojsonlayer = new GeoJSONLayer({
                    url: "https://raw.githubusercontent.com/adarshvarma15/mygeojson/main/RMS_Crime_Incidents%20edited.geojson",
                    popupTemplate: template,
                    renderer: renderer
                })
                webmap.add(geojsonlayer)
                 //*TODO:=========================bookmark======================================  
                 // *?--------add butbookmarks to view-----
                  const bookmarks = new Bookmarks({ view:view,
                  bookmarks:existingData });
                  // if (localStorage.getItem(BOOKMARK_KEY)) {
                  //   let locations=JSON.parse(localStorage.getItem(BOOKMARK_KEY));
                  //   let ourLocation=locations.filter((lo)=>{
                  //     if(lo.name.split(" ")[2].split(":")[1]==location.state.user.id)return lo})
                  //   }
                  //   console.log( );
                 view.ui.add(bookmarks, "top-right");
                 // *?----------add button-----------------
                  const button = document.createElement("div");
                  button.classList.add("esri-component", "add-button", "esri-widget-button", "esri-widget", "esri-interactive");
                  const span = document.createElement("span");
                  span.classList.add("esri-icon");
                  span.innerHTML = '<svg class="esri-widget__content-icon--empty" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="currentColor" d="M26 30.435L16.5 24.1 7 30.435V1h19zm-9.5-7.536l8.5 5.666V2H8v26.565z"></path></svg>';
                  button.appendChild(span);
                  view.ui.add(button, "top-left");
                  // *?----------add evvent to button-------
                  button.addEventListener("click", () => {
                    let id;
                    let users = JSON.parse(localStorage.getItem("user"));
                    console.log(users[0])
                    for (let i = 0; i < users.length; i++) {
                      if (location.state.user.email == users[i].email) {
                        console.log(users[i]);
                        // *?----------add bookmarks to map ------
                        id = users[i].id;
                      }
                    }
                    let bookmark = {
                      extent: view.extent.toJSON(),
                      name: `Bookmark: ${bookmarks.bookmarks.length + 1} id:${id}`,
                    };
                    console.log(location.state.user.email);
                    bookmarks.bookmarks.add(bookmark);
                    // ---------local Storage-----------------
                    const rawBookmarks = bookmarks.bookmarks.map(bm => bm.toJSON());
                    //{email:vakuw,bookmarks:}
                    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(rawBookmarks));
                  });
                 //*TODO:========================= end bookmark======================================  
            })
            return () => {
                //close the map 
                if (!!view) {
                    view.destroy()
                    view = null
                }
            }
        },[])
        function logout(){
          navigate("/")
        }
    return (
              <div id="viewDiv" style={{ height:"80vh", width:"80%",margin:"50px auto", backgroundColor: "#ddd" }} ref={mapElement}> 
              
              <a onClick={logout}> <i class="fas fa-sign-out-alt fa-3x"></i></a>
              </div>
           ) 
}
export default Map






