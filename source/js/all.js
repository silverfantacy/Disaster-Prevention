var app = new Vue({
  el:'#app',
  data: {
    message : 'Hello World！'
  }
})

var locationData = '';
var xhr = new XMLHttpRequest();
xhr.open('get', 'https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json', true);
xhr.send(null);
xhr.onload = function () {
    var str = JSON.parse(xhr.responseText);
    locationData=str.DataSet['diffgr:diffgram'].NewDataSet.CASE_SUMMARY;
    //   撈到資料後再執行你要執行的 function
    renderHTML()
}
function renderHTML() {
    var str ='';
    var len = locationData.length;
    console.log(locationData);
    for(var i = 0;len>i;i++){
      str+= '<li>'+locationData[i].CaseLocationDistrict+'：'+locationData[i].CaseDescription+'</li>';
    }
    document.querySelector('.show').innerHTML = str;
}