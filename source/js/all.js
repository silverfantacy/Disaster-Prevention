const apiUrl = 'https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json'; //將apiUrl設定為常數不再變動。

var app = new Vue({
    el: '.app',
    data: {
        area: '全部',
        disasterData: null,
        showinfo: null
    },
    created: function () {
        //執行
        this.callData()

    },
    filter: {

    },
    methods: {
        filterArea: function (item) {
            if (this.area == '全部') {
                return true
            } else if (item.CaseLocationDistrict == this.area) {
                return true
            }
        },
        callData: function () {
            // GET /someUrl
            this.$http.get(apiUrl).then(response => {


                // 獲取災害資訊
                this.disasterData = response.body.DataSet['diffgr:diffgram'].NewDataSet.CASE_SUMMARY;

                this.showinfo = response.status;

            }, response => {
                this.showinfo = response.status;
            });
        }


    }

    /*https://github.com/pagekit/vue-resource*/
    /*VUE RESOURCE*/

})