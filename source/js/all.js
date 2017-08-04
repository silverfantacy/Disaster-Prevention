const apiUrl = 'https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json'; //將apiUrl設定為常數不再變動。

var app = new Vue({
  el: '#app',
  data: {
    area: '全部',
    disasterData: null,
    showDisaster: null,
    showinfo: null,
    countOfPage: 50, //一頁顯示50筆
    currPage: 1, //第一頁
    rows: []
  },
  created: function () {
    //執行
    this.callData()
  },
  computed: {
    callData: function () {
      // GET /someUrl
      this.$http.get(apiUrl).then(response => {

        // 獲取災害資訊，取得資料
        this.disasterData = response.body.DataSet['diffgr:diffgram'].NewDataSet.CASE_SUMMARY;
        initMap(this.disasterData);
        this.rows = response.body.DataSet['diffgr:diffgram'].NewDataSet.CASE_SUMMARY;
        this.showinfo = response.status;

      }, response => {
        this.showinfo = response.status;
      });
    },
    //filteredRows
    pageStart: function() {
        return (this.currPage - 1) * this.countOfPage;
    }, //End of pageStart
    totalPage: function() {
        return Math.ceil(this.disasterData.length / this.countOfPage); 
        //資料數除以一頁顯示幾筆等於總頁數
    }
  },
  methods: {
    filterArea: function (item) {
      //篩選區域
      if (this.area == '全部') {
        return true;
      } else if (item.CaseLocationDistrict == this.area) {
        return true;
      }
    }
  }
  /*https://github.com/pagekit/vue-resource*/
  /*VUE RESOURCE*/
})

// Google Map API

function initMap(data) {
  // 設定中心點座標
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 25.0329636,
      lng: 121.5654268
    },
    zoom: 13
  });
  for (var i = 0; i < data.length; i++) {
    var str = {};
    var place = {};

    place.lat = parseFloat(data[i].Wgs84Y);
    place.lng = parseFloat(data[i].Wgs84X);

    str.map = map;
    str.title = data[i].Name;
    str.position = place;
    str.icon = 'https://developers.google.com/maps/documentation/javascript/images/circle.png';
    // console.log(place);
    new google.maps.Marker(str);
  }
}

$("#gotop").on("click", function(e) { // gotop start
    e.preventDefault();

    $('html, body').animate({
        scrollTop: $("html").offset().top
    }, 500);

});