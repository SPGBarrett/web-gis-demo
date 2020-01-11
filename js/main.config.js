//Public variables:
//var baseUrl = "http://192.0.163.78:9908";
//var baseUrl = "http://223.84.191.228:9908"
var baseUrl = ""
//var baseWebServiceUrl = "http://223.84.191.228:9901";
var baseWebServiceUrl = "";
//var baseUrl = "http://127.0.0.1:5052";
//var socketBaseUrl = "ws://127.0.0.1:5052";
//var socketBaseUrl = "ws://223.84.191.228:8896";

// Url for Springboot WebAPI
var urlInsertData = baseUrl + "/SitePatrol/RiskAssessment";
var urlInsertAllData = baseUrl + "/SitePatrol/RiskAssessmentAll";
var urlUpdateData = baseUrl + "/SitePatrol/RiskAssessment";
var urlDeleteData = baseUrl + "/SitePatrol/RiskAssessment";
var urlDeleteListData = baseUrl + "/SitePatrol/RiskAssessmentList";
var urlGetAllData = baseUrl + "/SitePatrol/RiskAssessmentAll";
var urlGetFilteredData = baseUrl + "/SitePatrol/RiskAssessmentFiltered";
var urlGetDistinctRiskLevel =  baseUrl + "/SitePatrol/RiskAssessment/RiskLevel";
var urlGetDistinctRiskType =  baseUrl + "/SitePatrol/RiskAssessment/RiskType"

// Url for Webservice:
var urlWebserviceMain = baseWebServiceUrl + "/WebApp/pages/Service/MainService.asmx";

var urlWebServiceGetArea = baseWebServiceUrl + "/WebApp/pages/Service/MainService.asmx/GetAreas";
var urlWebServiceGetLocationFromArea = baseWebServiceUrl + "/WebApp/pages/Service/MainService.asmx";
var urlWebServiceGetGistByLocationID = baseWebServiceUrl + "/WebApp/pages/Service/MainService.asmx";
var urlWebServiceGetGistByAllNames = baseWebServiceUrl + "/WebApp/pages/Service/MainService.asmx";

// For config application version and working environment:
var applicationProperties = "dev";
