// Flag for insert or edit:
var flagForInsertOrEdit = 0; // 0=insert, 1=edit
// Public settings:
var messageboxDuration = 1500;

//http://127.0.0.1:5501/map-index.html?id=100
// Get params when loaded:
window.onload = function () {
    let params = GetRequest();
    if(params.id != null && params.id != this.undefined){
        alert("id: " + params.id);
    }
    
}
// Decode params:
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}



// Define Vue object for index.html
var indexVue = new Vue({
    el: '#app',
    data: function () {
        return {
            // Variables:
            showFileInputProgressbar: false, // Progress show when inputing file
            fileInputProgressText: "正在处理文件，请稍后...",
            showpatchDeleteBtn: false,
            gistIdUneditable: true,
            visible: false,
            alertShow: false,
            show3: false,
            filePanelShow: false, // show file input panel
            searchPanelShow: false, // show search panel
            areaList: [{
                    aera: '测试区域1'
                },
                {
                    aera: '测试区域2'
                },
                {
                    aera: '测试区域3'
                }
            ],
            locationList: [], // Locationlist for search panel
            formLocationList: [], // Location list for insert form panel
            gistList: [], // Gist list for search panel
            formGistList: [], // Gist list for insert from panel
            riskLevelList: [],
            riskTypeList: [],
            selectedArea: "",
            selectedLocation: "",
            selectedLocationID: "",
            formSelectedLocationID: "",
            formSelectedGistID: "", //selected gistID in insert form
            selectedGist: "",
            selectedRiskLevel: "",
            selectedRiskType: "",
            // Variable for query data from risk-server:
            queryParams: {
                area: "",
                site_position: "",
                gist_id: "",
                gist: "",
                risk_level: "",
                harm_name: "",
                risk_type: ""
            },
            formData: { // Initial data for main table
                id: 8,
                guid: "10d01700-9ef4-4ed8-826d-6e85c987329c",
                area: "烟囱区域",
                site_position: "烟囱混凝土外筒壁",
                gist_id: "05A44D2D-C1F4-44E4-87D7-224F7B426891",
                gist: "钢筋加工",
                harm_name: "调直机操作不正确",
                harm_type: "",
                info_describe: "",
                risk_describe: "由于操作或维修不当造成机械损坏及人员伤亡。",
                risk_type: "机械伤害",
                risk_category: "安全类",
                exposed: "机械操作人员及附近的其它人员",
                risk_level_con: 25,
                risk_level_exp: 2,
                risk_level_poss: 1,
                risk_level_value: 50,
                risk_level: "一般",
                recom_action: null,
                professional: null,
                location: null
            },
            formLabelWidth: '120px',
            tableDataFromParent: [{
                    "id": 5,
                    "guid": "25456f11-786e-4fc7-a8a8-bb98c3d6f8e9",
                    "area": "烟囱区域",
                    "site_position": "烟囱混凝土外筒壁",
                    "gist_id": "05A44D2D-C1F4-44E4-87D7-224F7B426888",
                    "gist": "钢筋加工",
                    "harm_name": "操作、维修不符合要求",
                    "harm_type": "",
                    "info_describe": "",
                    "risk_describe": "由于操作或维修不当造成机械损坏及人员伤亡。",
                    "risk_type": "机械伤害",
                    "risk_category": "安全类",
                    "exposed": "机械操作人员及附近的其它人员",
                    "risk_level_con": 25,
                    "risk_level_exp": 1,
                    "risk_level_poss": 3,
                    "risk_level_value": 75,
                    "risk_level": "较大",
                    "recom_action": null,
                    "professional": null,
                    "location": null
                },
                {
                    "id": 7,
                    "guid": "707c09ad-45fe-4efc-a857-0895efc91d6b",
                    "area": "烟囱区域",
                    "site_position": "烟囱混凝土外筒壁",
                    "gist_id": "05A44D2D-C1F4-44E4-87D7-224F7B426890",
                    "gist": "钢筋加工",
                    "harm_name": "砂轮机使用方法不当",
                    "harm_type": "",
                    "info_describe": "",
                    "risk_describe": "由于操作或维修不当造成机械损坏及人员伤亡。",
                    "risk_type": "机械伤害",
                    "risk_category": "安全类",
                    "exposed": "机械操作人员及附近的其它人员",
                    "risk_level_con": 25,
                    "risk_level_exp": 2,
                    "risk_level_poss": 1,
                    "risk_level_value": 25,
                    "risk_level": "一般",
                    "recom_action": null,
                    "professional": null,
                    "location": null
                }
            ],
            fileList: [],
            fileSelected: []
        }
    },
    methods: {
        //**********************************All control binded or related methods: ******************************* */
        // Button click to refresh this page:
        refeshPage: function () {
            window.location.reload();
            //test();
            // console.log(this.areaList);
            // console.log(this.queryParams);
            // console.log(this.locationList);
            // console.log(this.selectedLocation);
            // console.log(this.selectedLocationID);
            function testcallback(id) {
                console.log(id);
            }
            //getIDFromServerOrLocal('烟囱区域', '烟囱平台拆除作业点', '施工升降机的安装、拆除', testcallback);
            //getIDFromServerOrLocal('烟囱区域', '烟囱平台作业点', '钢筋加工', testcallback);
            //getIDFromServerOrLocal2('#7冷却塔区域', '2#塔吊顶端', '行走路线上存在孔洞、偏坡、障碍物等', testcallback);
            //this.showFileInputProgressbar = true;
        },
        // Button click to insert data:
        insertClick: function () {
            initFormData(null);
            flagForInsertOrEdit = 0;
            this.visible = true;
        },
        // Patch delete:
        patchDelete: function () {
            // this.$message({
            //     showClose: true,
            //     dangerouslyUseHTMLString: true,
            //     duration: messageboxDuration,
            //     type: 'warning',
            //     //message: '批量删除功能开发中，敬请期待！'
            //     message: '<strong><h1 style="font-size: 100px;">批量删除功能开发中，敬请期待！哈哈哈哈哈哈！</h1></strong>'
            // });
            // Get all selected data from child:
            var selectedRows = this.$refs.tableComp.selectedRows;
            if (selectedRows.length <= 0) {
                this.$message({
                    showClose: true,
                    duration: messageboxDuration,
                    type: 'info',
                    message: '并未选中任何表中的项目！'
                });
            } else {
                this.$confirm('是否要删除当前选中的所有内容？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteDataListFromServer(selectedRows);
                }).catch(() => {});

            }
        },
        // Form button click events:
        dataFormOKClick: function () {
            if (flagForInsertOrEdit == 0) {
                var dataToInsert = this.formData;
                // Delete key-value of "ID"
                delete dataToInsert.id;
                console.log(dataToInsert);
                this.visible = false;
                // Ajax to insert data and then update table:
                this.insertDataIntoServer(dataToInsert);
            } else if (flagForInsertOrEdit == 1) {
                var dataToUpdate = this.formData;
                console.log(dataToUpdate);
                this.visible = false;
                // Ajax to update data and then update table:
                this.updateDataForServer(dataToUpdate);
            } else {
                alert("Flag is incorrect!");
            }
        },
        // Form button cancel click:
        dataFormCancelClick: function () {
            this.visible = false;
        },
        // Table column delete button click:
        dataDeleteEventHandler: function (index) {
            console.log("Delete event catched! tableIndex=" + index);
            // Get data id from index:
            var selectedID = this.tableDataFromParent[index].id;
            this.deleteDataFromServer(selectedID);
        },
        // Table column edit button click:
        editEventHandler: function (index) {
            console.log("Edit event catched! tableIndex=" + index);
            // Get data for form:
            var dataToEdit = this.tableDataFromParent[index];
            initFormData(dataToEdit);
            // Set flag and show form:
            flagForInsertOrEdit = 1;
            this.visible = true;
        },
        multiSelectionHandler: function (count) {
            // Handle the display of patch delete button:
            if (count <= 0) {
                this.showpatchDeleteBtn = false;
            } else {
                this.showpatchDeleteBtn = true;
            }
        },
        // Search panel search button click:
        searchClick: function () {
            // MVVM helped to get all queryparams, just start querying:
            console.log(this.queryParams);
            this.queryRiskByParamsFromServer();
            // Reset pagination:
            this.$refs.tableComp.resetPagination();
        },
        // Search panel reset button click:
        searchResetClick: function () {
            // Reset query params:
            this.queryParams = {
                area: "",
                site_position: "",
                gist_id: "",
                gist: "",
                risk_level: "",
                harm_name: "",
                risk_type: ""
            };
            // Refresh table:
            this.queryRiskByParamsFromServer();
        },
        // Called when area selected: 
        onSearchSelectedAreaChange: function () {
            var tmpThis = this;
            var selectedAreaName = this.queryParams.area;

            function getLocationListCallback(locationList) {
                tmpThis.locationList = locationList;
            };
            // Ajax to get data:
            this.getLoacationByAreaNameFromWebservice(selectedAreaName, getLocationListCallback);
        },
        // Called when area selected: 
        onFormSelectedAreaChange: function () {
            var tmpThis = this;
            // Get selected area name:
            var selectedAreaName = this.formData.area;

            function getLocationListCallback(locationList) {
                tmpThis.formLocationList = locationList;
            };
            // Ajax to get data:
            this.getLoacationByAreaNameFromWebservice(selectedAreaName, getLocationListCallback);
        },
        // Called when location selected: 
        onSearchSelectedLocationChange: function () {
            var tmpThis = this;
            // Get selected location name:
            var selectLocName = this.queryParams.site_position;
            // Get ID according to location name:
            var locID = getLocationIDFromLocationList(this.locationList, selectLocName);
            this.selectedLocationID = locID;
            // Callback method to set data:
            function getPointsCallback(gistList) {
                // Set Gist list:
                tmpThis.gistList = gistList;
            }
            // Ajax to get data:
            this.getPointsByLocationIDFromWebservice(locID, getPointsCallback);
        },
        // Called when location selected:
        onFormSelectedLocationChange: function () {
            var tmpThis = this;
            // Get selected location name:
            var selectLocName = this.formData.site_position;
            // Get ID according to location name:
            var locID = getLocationIDFromLocationList(this.formLocationList, selectLocName);
            this.formSelectedLocationID = locID;
            // Callback method to set data:
            function getPointsCallback(gistList) {
                // Set Gist list:
                tmpThis.formGistList = gistList;
            }
            // Ajax to get data:
            this.getPointsByLocationIDFromWebservice(locID, getPointsCallback);
        },
        // Called when gist selected: 
        onFormSelectedGistChange: function () {
            var tmpThis = this;
            // Get selected Gist name from form:
            var frmSelectedGistName = this.formData.gist;
            // Get Gist ID:
            var selcectedGistID = getGistIDFromGistList(this.formGistList, frmSelectedGistName);
            this.formSelectedGistID = selcectedGistID;
            // Set ID to binded params: (disabled)
            if (false && this.formData.gist_id != null && this.formData.gist_id != "") {
                this.$confirm('当前条目已存在要点ID，是否需要覆盖当前ID？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.formData.gist_id = selcectedGistID;
                }).catch(() => {});
            } else {
                this.formData.gist_id = selcectedGistID;
            }
        },
        //******************************************All Ajax methods **************************************** */
        // Ajax get data from risk-server:
        getAllDataFromServer: function () {
            // Get super: Very Important!! 闭包
            var tmpThis = this;
            axios({
                    method: "get",
                    url: urlGetAllData,
                    responseType: "json"
                })
                .then(function (response) {
                    // Get result:
                    var dataForTable = response.data;
                    // Set up params:
                    console.log("Data acquired form server!");
                    console.log(dataForTable);
                    // Update table using this!!!
                    tmpThis.tableDataFromParent = dataForTable;
                })
                .catch(function (error) {
                    console.log("ERROR: " + "failed!");
                    tmpThis.$message({
                        showClose: true,
                        duration: messageboxDuration,
                        type: 'info',
                        message: '从服务器获取数据失败，请检查网络连接！'
                    });
                });
        },
        // Query data by queryParams from risk-server:
        queryRiskByParamsFromServer: function () {
            // Get super: Very Important!! 闭包
            var tmpThis = this;
            axios({
                    method: "post",
                    url: urlGetFilteredData,
                    responseType: "json",
                    data: this.queryParams
                })
                .then(function (response) {
                    // Get result:
                    var dataForTable = response.data;
                    // Set up params:
                    console.log("Filtered Data acquired form server!");
                    console.log(dataForTable);
                    // Update table using this!!!
                    tmpThis.tableDataFromParent = dataForTable;
                })
                .catch(function (error) {
                    console.log("ERROR: " + "failed!");
                    tmpThis.$message({
                        showClose: true,
                        duration: messageboxDuration,
                        type: 'info',
                        message: '从服务器获取数据失败，请检查网络连接！'
                    });
                });
        },
        // Ajax insert one line of data into risk-server:
        insertDataIntoServer: function (dataToInsert) {
            // Get super: Very Important!! 闭包
            var tmpThis = this;
            axios({
                    method: "put",
                    url: urlInsertData,
                    responseType: "json",
                    data: dataToInsert
                })
                .then(function (response) {
                    // Get result:
                    console.log("Data Successfully inserted!");
                    console.log(response.data);
                    // Show message:
                    tmpThis.$message({
                        showClose: true,
                        duration: messageboxDuration,
                        type: 'success',
                        message: '数据成功插入数据库!'
                    });
                    // Update table:
                    tmpThis.queryRiskByParamsFromServer();
                    //tmpThis.getAllDataFromServer();
                })
                .catch(function (error) {
                    console.log("ERROR: " + "Insert data failed! Please Check Internet!");
                    tmpThis.$message({
                        showClose: true,
                        duration: messageboxDuration,
                        type: 'info',
                        message: '数据插入失败，请检查网络连接！'
                    });
                });
        },
        // Ajax insert a List of data into server:
        insertAllDataIntoServer: function (dataListToInsert) {
            // Get super: Very Important!! 闭包
            var tmpThis = this;
            axios({
                    method: "put",
                    url: urlInsertAllData,
                    responseType: "json",
                    data: dataListToInsert
                })
                .then(function (response) {
                    // Get result:
                    // Hide progress bar:
                    tmpThis.fileInputProgressText = "上传结束！";
                    tmpThis.showFileInputProgressbar = false;
                    console.log("Data Successfully inserted!");
                    console.log(response.data);
                    // Show message:
                    tmpThis.$message({
                        showClose: true,
                        type: 'success',
                        duration: messageboxDuration,
                        message: '数据成功批量插入数据库!'
                    });
                    // Update table:
                    tmpThis.queryRiskByParamsFromServer();
                    //tmpThis.getAllDataFromServer();
                })
                .catch(function (error) {
                    tmpThis.fileInputProgressText = "上传失败！";
                    tmpThis.showFileInputProgressbar = false;
                    console.log("ERROR: " + "Insert data failed! Please Check Internet!");
                    tmpThis.$message({
                        showClose: true,
                        duration: messageboxDuration,
                        type: 'info',
                        message: '数据插入失败，请检查网络连接！'
                    });
                });
        },
        // Ajax delete one data by id form risk-server:
        deleteDataFromServer: function (id) {
            // Get super: Very Important!! 闭包
            var tmpThis = this;
            axios({
                    method: "delete",
                    url: urlDeleteData,
                    responseType: "json",
                    params: {
                        paramInt: id
                    },
                })
                .then(function (response) {
                    // Get result:
                    console.log("Data Successfully deleted!");
                    console.log(response.data);
                    // Show message:
                    tmpThis.$message({
                        showClose: true,
                        type: 'success',
                        duration: messageboxDuration,
                        message: '数据删除成功!'
                    });
                    // Update table:
                    tmpThis.queryRiskByParamsFromServer();
                    //tmpThis.getAllDataFromServer();
                })
                .catch(function (error) {
                    console.log("ERROR: " + "Delete data failed! Please Check Internet!");
                    tmpThis.$message({
                        showClose: true,
                        duration: messageboxDuration,
                        type: 'info',
                        message: '数据删除失败，请检查网络连接！'
                    });
                });
        },
        // Ajax delete a list of data by id form risk-server:
        deleteDataListFromServer: function (dataList) {
            // Get super: Very Important!! 闭包
            var tmpThis = this;
            axios({
                    method: "delete",
                    url: urlDeleteListData,
                    responseType: "json",
                    data: dataList
                })
                .then(function (response) {
                    // Get result:
                    console.log("Data Successfully deleted!");
                    console.log(response.data);
                    // Show message:
                    tmpThis.$message({
                        showClose: true,
                        type: 'success',
                        duration: messageboxDuration,
                        message: '数据删除成功!'
                    });
                    // Update table:
                    tmpThis.queryRiskByParamsFromServer();
                    //tmpThis.getAllDataFromServer();
                })
                .catch(function (error) {
                    console.log("ERROR: " + "Delete data failed! Please Check Internet!");
                    tmpThis.$message({
                        showClose: true,
                        duration: messageboxDuration,
                        type: 'info',
                        message: '数据删除失败，请检查网络连接！'
                    });
                });
        },
        // Update data for risk-server:
        updateDataForServer: function (dataToUpdate) {
            // Get super: Very Important!! 闭包
            var tmpThis = this;
            axios({
                    method: "post",
                    url: urlUpdateData,
                    responseType: "json",
                    data: dataToUpdate
                })
                .then(function (response) {
                    // Get result:
                    console.log("Data Successfully updated!");
                    console.log(response.data);
                    // Show message:
                    tmpThis.$message({
                        showClose: true,
                        type: 'success',
                        duration: messageboxDuration,
                        message: '数据更新修改成功!'
                    });
                    // Update table:
                    tmpThis.queryRiskByParamsFromServer();
                    //tmpThis.getAllDataFromServer();
                })
                .catch(function (error) {
                    console.log("ERROR: " + "Update data failed! Please Check Internet!");
                    tmpThis.$message({
                        showClose: true,
                        duration: messageboxDuration,
                        type: 'info',
                        message: '数据更新失败，请检查网络连接！'
                    });
                });
        },
        // Get all distinct risk type from risk-server:
        getDistinctRiskType: function () {
            // Get super: Very Important!! 闭包
            var tmpThis = this;
            axios({
                    method: "get",
                    url: urlGetDistinctRiskType,
                    responseType: "json",
                })
                .then(function (response) {
                    // Get result:
                    tmpThis.riskTypeList = response.data;
                    // Show message:
                    tmpThis.$message({
                        showClose: true,
                        duration: messageboxDuration,
                        type: 'success',
                        message: '微服务连接正常，参数获取成功!'
                    });
                })
                .catch(function (error) {
                    console.log("ERROR: " + "Update data failed! Please Check Internet!");
                    tmpThis.$message({
                        showClose: true,
                        duration: messageboxDuration,
                        type: 'info',
                        message: '参数获取失败，请检查网络连接！'
                    });
                });
        },
        // Get all distinct risk type from risk-server:
        getDistinctRiskLevel: function () {
            // Get super: Very Important!! 闭包
            var tmpThis = this;
            axios({
                    method: "get",
                    url: urlGetDistinctRiskLevel,
                    responseType: "json",
                })
                .then(function (response) {
                    // Get result:
                    tmpThis.riskLevelList = response.data;
                    // Show message:
                    tmpThis.$message({
                        showClose: true,
                        type: 'success',
                        duration: messageboxDuration,
                        message: '微服务连接正常，参数获取成功!'
                    });
                })
                .catch(function (error) {
                    console.log("ERROR: " + "Update data failed! Please Check Internet!");
                    tmpThis.$message({
                        showClose: true,
                        type: 'info',
                        duration: messageboxDuration,
                        message: '参数获取失败，请检查网络连接！'
                    });
                });
        },
        // Get all area data by jQuery Ajax calling webservice from other-server:
        getAllAreaFromWebservice: function () {
            // Get super: Very Important!! 闭包
            var tmpThis = this;
            var params = constructGetAreaParams();
            // Define callback method to process data:
            function getAreaCallback(response) {
                // Get data form response:
                var responseJsonText = response.documentElement.textContent;
                var responseJsonObject = JSON.parse(responseJsonText);
                console.log(responseJsonObject);
                // Set area list:
                tmpThis.areaList = responseJsonObject.areas;
            };
            // Get area:
            ajaxWebserviceRequest(urlWebServiceGetArea, params, getAreaCallback);
        },
        // Get all location data pertain to area by jQuery Ajax calling webservice from other-server:
        getLoacationByAreaNameFromWebservice: function (areaName, callback) {
            // Get super: Very Important!! 闭包
            var tmpThis = this;
            if (areaName == null) {
                callback(null);
                return null;
            }
            var params = constructGetLocationByAreaParams(areaName);
            console.log(params);
            // Define callback method to process data:
            function getLocationCallback(response) {
                // Get data form response:
                var responseJsonText = response.documentElement.textContent;
                var responseJsonObject = JSON.parse(responseJsonText);
                console.log(responseJsonObject);
                // Callback to process list:
                callback(responseJsonObject.locationsbyareas);
            };
            // Get Location:
            ajaxWebserviceRequest(urlWebServiceGetLocationFromArea, params, getLocationCallback);
        },
        // Get all location data pertain to area by jQuery Ajax calling webservice from other-server:
        getPointsByLocationIDFromWebservice: function (locationID, callback) {
            // Get super: Very Important!! 闭包
            var tmpThis = this;
            var params = constructGetPointsByLocationParams(locationID);
            // Define callback method to process data:
            function getGistCallback(response) {
                // Get data form response:
                var responseJsonText = response.documentElement.textContent;
                var responseJsonObject = JSON.parse(responseJsonText);
                console.log(responseJsonObject);
                // Callback to further process data:
                callback(responseJsonObject.lzq);
            };
            // Get Gist:
            ajaxWebserviceRequest(urlWebServiceGetGistByLocationID, params, getGistCallback);
        },
        // Get gist id by area, location and gist names:
        getGistIDByAreaLocationGistNames(areaName, locationName, gistName, callback) {
            // Trim string:
            var areaNameTrimed = areaName.trim();
            var locationNameTrimed = locationName.trim();
            var gistNameTrimed = gistName.trim();
            // Get super: Very Important!! 闭包
            var tmpThis = this;
            var params = constructGetGistIDByNamesParams(areaNameTrimed, locationNameTrimed, gistNameTrimed);
            // Define callback method to process data:
            function getGistIdCallback(response) {
                // Get data form response:
                var responseJsonText = response.documentElement.textContent;
                var responseJsonObject = JSON.parse(responseJsonText);
                console.log(responseJsonObject);
                // Callback to further process data:
                callback(responseJsonObject.PointByAreaLocationAndPointName);
            };
            // Get Gist:
            ajaxWebserviceRequest(urlWebServiceGetGistByAllNames, params, getGistIdCallback);

        },
        //*************************************File Input and output methods:************************* */
        // Button click to import xlxs files:
        importXlxsFileClick: function () {
            // Get super: Very Important for async and callback methods:
            var tmpThis = this;
            // Get file objcet from fileinput:
            if (this.$refs.files == null || this.$refs.files.files.length <= 0) {
                this.$alert('请先选择需要上传的文件！', '错误', {
                    confirmButtonText: '确定'
                });
                return null;
            }
            var inputFile = this.$refs.files.files[0];
            // Set callback method:
            // Callback function when all data loaded:
            function xlxsReadCallback(jsonArray) {
                if (jsonArray == null) {
                    tmpThis.$alert('导入文件格式不符合要求！', '错误', {
                        confirmButtonText: '确定'
                    });
                    return null;
                }
                // Callback method when the gist id in the arrary are fully updated:
                function idUpdatedCallback() {
                    // Update progress bar text:
                    tmpThis.fileInputProgressText = "开始上传数据到服务器，请稍后..."
                    // Insert json array to server:
                    tmpThis.insertAllDataIntoServer(jsonArray);
                }
                // Get all Gist IDs:
                var newArray = updateGistIdOfDataArray(jsonArray, 0, idUpdatedCallback);

            }
            // Read files:
            readWorkbookFromLocalFile(inputFile, xlxsReadCallback);
            // Show progress bar:
            this.fileInputProgressText = "正在解析数据文件，请稍后...";
            this.showFileInputProgressbar = true;
        },
        // File input panel info button click:
        infoHelpClick: function () {
            var helpText = "点击“下载模板”按钮可以下载文件上传的模板。" + "\n";
            helpText += "按照模板要求填好数据后，可以选择该文件，并批量导入到数据库中。" + "\n";
            helpText += "注意： 模板文件中有一行示例数据，需要在导入文件之前删除掉。" + "\n";
            this.$alert(helpText, '帮助', {
                confirmButtonText: '确定'
            });
        },
        // Output file button click:
        outputRiskDataFile: function () {
            // Get data:
            var currentTableData = this.tableDataFromParent;
            var aoa = convertJsonArrayToArrayArray(currentTableData);
            console.log(aoa);
            var sheet = XLSX.utils.aoa_to_sheet(aoa);
            openDownloadDialog(sheet2blob(sheet), '当前隐患数据导出.xlsx');
        },
        // Sample file download click:
        downloadSampleFile: function () {
            var aoa = generateSampleFileSheet();
            var sheet = XLSX.utils.aoa_to_sheet(aoa);
            openDownloadDialog(sheet2blob(sheet), '数据文件模板.xlsx');
        },
        // Tests:
        testStuff: function () {
            alert(this.selectedArea);

        }
    },
    //*********************************************Life cycles: ****************************************/
    mounted() {
        //this.getAllDataFromServer();
        this.queryRiskByParamsFromServer();
        // Get all area from webservice:
        this.getAllAreaFromWebservice();
        // Get params:
        this.getDistinctRiskLevel();
        this.getDistinctRiskType();
    },
    //********************************************Watch methods: ***********************************/
    watch: {
        selectedArea: "testStuff",
    },

});



//*****************************************Factory Functions *****************************/
// Initialize form data:
function initFormData(data) {
    if (data == null || data == undefined) {
        indexVue.formData = {
            id: 0,
            guid: null,
            area: null,
            site_position: null,
            gist_id: null,
            gist: null,
            harm_name: null,
            harm_type: null,
            info_describe: null,
            risk_describe: null,
            risk_type: null,
            risk_category: null,
            exposed: null,
            risk_level_con: null,
            risk_level_exp: null,
            risk_level_poss: null,
            risk_level_value: null,
            risk_level: null,
            recom_action: null,
            professional: null,
            location: null
        };
    } else { //Use copy, not assign:
        indexVue.formData = {
            id: data.id,
            guid: data.guid,
            area: data.area,
            site_position: data.site_position,
            gist_id: data.gist_id,
            gist: data.gist,
            harm_name: data.harm_name,
            harm_type: data.harm_type,
            info_describe: data.info_describe,
            risk_describe: data.risk_describe,
            risk_type: data.risk_type,
            risk_category: data.risk_category,
            exposed: data.exposed,
            risk_level_con: data.risk_level_con,
            risk_level_exp: data.risk_level_exp,
            risk_level_poss: data.risk_level_poss,
            risk_level_value: data.risk_level_value,
            risk_level: data.risk_level,
            recom_action: data.recom_action,
            professional: data.professional,
            location: data.location
        };
    }
}
// Function to search to get ID in Location list from location name:
function getLocationIDFromLocationList(locationList, locationName) {
    if (locationList == null || locationList.length <= 0 || locationName == null) return null;
    // Loop to get result:
    for (let i = 0; i < locationList.length; i++) {
        if (locationList[i].Place == locationName) {
            return locationList[i].ID;
        }
    }
}
// Function to search to get ID in gist list from gist name:
function getGistIDFromGistList(gistList, gistName) {
    if (gistList == null || gistList.length <= 0 || gistName == null) return null;
    // Loop to get result:
    for (let i = 0; i < gistList.length; i++) {
        if (gistList[i].Name == gistName) {
            return gistList[i].ID;
        }
    }
}


// ******************************Encapsulate jQuery ajax method: ****************************************/
// GetArea required params:
function constructGetAreaParams() {
    var queryParams = '<?xml version="1.0" encoding="utf-8"?>';
    queryParams += '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    queryParams += '<soap:Body>';
    queryParams += '<GetAreas xmlns="http://tempuri.org/" />';
    queryParams += '</soap:Body>';
    queryParams += '</soap:Envelope>';
    return queryParams;
}
// GetLocationByArea required params: String areaName
function constructGetLocationByAreaParams(areaName) {
    var queryParams = '<?xml version="1.0" encoding="utf-8"?>';
    queryParams += '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    queryParams += '<soap:Body>';
    queryParams += '<GetLocationByAreas xmlns="http://tempuri.org/">';
    queryParams += '<areaName>' + areaName + '</areaName>';
    queryParams += '</GetLocationByAreas>';
    queryParams += '</soap:Body>';
    queryParams += '</soap:Envelope>';
    return queryParams;

}
// GetLocationByArea required params: String locationID
function constructGetPointsByLocationParams(locationID) {
    var queryParams = '<?xml version="1.0" encoding="utf-8"?>';
    queryParams += '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    queryParams += '<soap:Body>';
    queryParams += '<GetPointListByLocationId xmlns="http://tempuri.org/">';
    queryParams += '<LocationId>' + locationID + '</LocationId>';
    queryParams += '</GetPointListByLocationId>';
    queryParams += '</soap:Body>';
    queryParams += '</soap:Envelope>';
    return queryParams;
}
// GetLocationByArea required params: String locationID
function constructGetGistIDByNamesParams(areaName, locationName, gistName) {
    var queryParams = '<?xml version="1.0" encoding="utf-8"?>';
    queryParams += '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    queryParams += '<soap:Body>';
    queryParams += '<GetPointByAreasLocationAndPointName xmlns="http://tempuri.org/">';
    queryParams += '<areaName>' + areaName + '</areaName>';
    queryParams += '<locationName>' + locationName + '</locationName>';
    queryParams += '<pointName>' + gistName + '</pointName>';
    queryParams += '</GetPointByAreasLocationAndPointName>';
    queryParams += '</soap:Body>';
    queryParams += '</soap:Envelope>';
    return queryParams;
}

// Generic jQuery Ajax method:
function ajaxWebserviceRequest(queryUrl, params, callback) {
    $.ajax({
        url: queryUrl,
        type: "post",
        dataType: "xml",
        contentType: "text/xml; charset=UTF-8",
        data: params,
        crossDomain: true,
        beforeSend: function (XMLHttpRequest) {
            // XMLHttpRequest.setRequestHeader("Content-Type", "text/xml");
        },
        success: function (response) {
            console.log(response);
            // Execute callback method to process response data:
            callback(response);
        },
        error: function (response) {
            console.log(response);
        }
    });
}

// Generic sync jQuery Ajax method:
function syncAjaxWebserviceRequest(queryUrl, params, callback) {
    $.ajax({
        url: queryUrl,
        type: "post",
        dataType: "xml",
        contentType: "text/xml; charset=UTF-8",
        data: params,
        crossDomain: true,
        async: false,
        beforeSend: function (XMLHttpRequest) {
            // XMLHttpRequest.setRequestHeader("Content-Type", "text/xml");
        },
        success: function (response) {
            console.log(response);
            // Execute callback method to process response data:
            callback(response);
        },
        error: function (response) {
            console.log(response);
        }
    });
}

// Get GIST ID from server or from local:
var localCacheForGistID = [{ // public variable to store successfully queried results
    area: "",
    site_positon: "",
    gist: "",
    gist_id: ""
}];
// Get Gist ID using three isolated webservice and callbacks:
function getIDFromServerOrLocal(areaName, locationName, gistName, callback) {
    var tmpLocationList = [];
    var tmpGistList = [];
    // Check local cache:
    for (let i = 0; i < localCacheForGistID.length; i++) {
        if (localCacheForGistID[i].area == areaName && localCacheForGistID[i].site_positon == locationName && localCacheForGistID[i].gist == gistName) {
            callback(localCacheForGistID[i].gist_id);
            return true;
        }
    }
    // Callback method to set data:
    function getPointsCallback(gistList) {
        // Set Gist list:
        tmpGistList = gistList;
        // Get ID from gistlist:
        var gistID = getGistIDFromGistList(gistList, gistName);
        if (gistID == null) {
            callback(null);
            return null;
        }
        // output result:
        if (gistID != null) {
            callback(gistID);
            // Save current data to cache list:
            var cacheInfo = {
                area: areaName,
                site_positon: locationName,
                gist: gistName,
                gist_id: gistID
            };
            localCacheForGistID.push(cacheInfo);
            return true;
        } else {
            callback(null);
        }
    }
    // If nothing found, ajax query for data:
    function getLocationListCallback(locationList) {
        // Get result list:
        tmpLocationList = locationList;
        // Get target ID:
        var locationID = getLocationIDFromLocationList(locationList, locationName);
        if (locationID == null) {
            callback(null);
            return null;
        }
        // Get gist list by location ID:
        indexVue.getPointsByLocationIDFromWebservice(locationID, getPointsCallback);
    }
    // Ajax to get data:
    indexVue.getLoacationByAreaNameFromWebservice(areaName, getLocationListCallback);
}

// Get Gist ID using one integrated webservice and callbacks:
function getIDFromServerOrLocal2(areaName, locationName, gistName, callback) {
    var tmpLocationList = [];
    var tmpGistList = [];
    // Check local cache:
    for (let i = 0; i < localCacheForGistID.length; i++) {
        if (localCacheForGistID[i].area == areaName && localCacheForGistID[i].site_positon == locationName && localCacheForGistID[i].gist == gistName) {
            callback(localCacheForGistID[i].gist_id);
            return true;
        }
    }
    // Callback method to set data:
    function getPointsCallback(gistList) {
        // Set Gist list:
        tmpGistList = gistList;
        // Get ID from gistlist:
        var gistID = getGistIDFromGistList(gistList, gistName);
        if (gistID == null) {
            callback(null);
            return null;
        }
        // output result:
        if (gistID != null) {
            // Save current data to cache list:
            var cacheInfo = {
                area: areaName,
                site_positon: locationName,
                gist: gistName,
                gist_id: gistID
            };
            localCacheForGistID.push(cacheInfo);
            callback(gistID);
            return true;
        } else {
            callback(null);
        }
    }
    indexVue.getGistIDByAreaLocationGistNames(areaName, locationName, gistName, getPointsCallback);
}
// Recursive method to update gist ID in the array:
function updateGistIdOfDataArray(jsonArray, index, callback) {
    if (jsonArray == null) return null;
    if (index >= jsonArray.length) {
        callback();
        return jsonArray;
    }
    let areaName = jsonArray[index].area;
    let locationName = jsonArray[index].site_position;
    let gistName = jsonArray[index].gist;

    function getIdAndUpdateCallback(resultId) {
        if (resultId == null) {
            jsonArray[index].gist_id = "数据中index:" + index + "的ID不存在";
        } else {
            jsonArray[index].gist_id = resultId;
        }
        var newIndex = index + 1;
        updateGistIdOfDataArray(jsonArray, newIndex, callback);
    }
    //getIDFromServerOrLocal(areaName, locationName, gistName, getIdAndUpdateCallback);
    getIDFromServerOrLocal2(areaName, locationName, gistName, getIdAndUpdateCallback);
}
// Test function:
function test() {
    // Construct XML data:
    var testData = '<?xml version="1.0" encoding="utf-8"?>';
    testData += '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    testData += '<soap:Body>';
    testData += '<GetAreas xmlns="http://tempuri.org/" />';
    testData += '</soap:Body>';
    testData += '</soap:Envelope>';
    $.ajax({
        url: "http://223.84.191.228:9901/WebApp/pages/Service/MainService.asmx",
        type: "post",
        dataType: "xml",
        contentType: "text/xml; charset=UTF-8",
        data: testData,
        crossDomain: true,
        beforeSend: function (XMLHttpRequest) {
            // XMLHttpRequest.setRequestHeader("Content-Type", "text/xml");
        },
        success: function (response) {
            console.log(response);
            // Get data form response:
            var responseJsonText = response.documentElement.textContent;
            var responseJsonObject = JSON.parse(responseJsonText);
            console.log(responseJsonObject);
            // Get one area:
            var oneArea = responseJsonObject.areas[0].aera;
            console.log(oneArea);

        },
        error: function (response) {
            console.log(response);
        }
    });
}