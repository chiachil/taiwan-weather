import { renderWeatherLocationLock } from "./renderWeatherData";

function init() {
  //取得 經緯度
  if (navigator.geolocation) {
    //
    navigator.geolocation.getCurrentPosition(showPosition); //有拿到位置就呼叫 showPosition 函式
  } else {
    m.innerHTML =
      "您的瀏覽器不支援 顯示地理位置 API ，請使用其它瀏覽器開啟 這個網址";
  }
  function showPosition(position) {
    let my_lat = position.coords.latitude;
    let my_lon = position.coords.longitude;
    let min_result = 9999;
    let locationName = "台北";

    fetch(
      "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-EF46CCF9-7FB5-4120-AA40-CFDDA8BC249C"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        let city = data["records"]["locations"][0]["location"];
        city.forEach((element) => {
          let lat = element["lat"];
          let lon = element["lon"];

          let result =
            ((my_lat - lat) * (my_lat - lat) +
              (my_lon - lon) * (my_lon - lon)) **
            0.5;

          if (min_result > result) {
            min_result = result;
            locationName = element["locationName"];
          }
        });
        console.log(locationName);
        renderWeatherLocationLock(locationName);
        return;
      });
  }
}

init();
