import { fetchGet,fetchPost,fetchDelete } from '../utils/request.js'

/**
 * 注册获取国家
 */
export function businessGetCountry () {
  return fetchGet(`${process.env.VUE_APP_API_URL}/api/Business/GetCountry`)
};
/**
 * 验证该网址和公司是否存在我们的爬虫数据中
 */
export function businessVerificationCompany (data) {
  return fetchPost(`${process.env.VUE_APP_API_URL}/api/Business/VerificationCompany`,data)
};
/**
 * 保存商家注册信息
 */
export function businessSaveBusiness (data) {
  return fetchPost(`${process.env.VUE_APP_API_URL}/api/Business/SaveBusiness`,data)
};
/**
 * 获取两种验证方式的加密串和文件
 */
export function businessGenerateCode (data) {
  return fetchGet(`${process.env.VUE_APP_API_URL}/api/Business/GenerateCode`,data)
};
/**
 * 商家注册验证
 */
export function businessVerificationCode (data) {
  return fetchPost(`${process.env.VUE_APP_API_URL}/api/Business/VerificationCode`,data)
};
/**
 * 文件下载
 */
export function businessDownLoadFile (data) {
  return fetchGet(`${process.env.VUE_APP_API_URL}/api/Business/DownLoadFile`,data)
};
/**
 * 获取siteid
 */
export function getWebSiteInfo (data) {
  return fetchGet(`${process.env.VUE_APP_API_URL}/api/UserInfo/GetWebSiteInfo`,data)
};
/**
 * 根据网址查询数据库中的公司信息
 */
export function apiGetSiteCompany (data) {
  return fetchGet(`${process.env.VUE_APP_API_URL}/api/Business/GetSiteCompany`,data)
};
/**
 * 登录
 */
export function login (data) {
  return fetchPost('/site/Login',data)
};
/**
 * 获取首页评论信息
 */
export function siteComment (data) {
  return fetchGet('/site/Comment',data)
};
/**
 * 获取柱状图数据
 */
export function siteAnalysticBrokenLine (data) {
  return fetchGet('/site/AnalysticBrokenLine',data)
};
/**
 * 获取饼状图数据
 */
export function siteAnalysticPieChart (data) {
  return fetchGet('/site/AnalysticPieChart',data)
};
/**
 * 评论页数据
 */
export function siteReviews (data) {
  return fetchGet('/site/Reviews',data)
};
/**
 * 商家回复接口
 */
export function siteReply (data) {
  return fetchPost('/site/Reply',data)
};
/**
 * 商家回复删除接口
 */
export function siteDelReply (data) {
  return fetchDelete('/site/Reply',data)
};
/**
 * 举报数据查询
 */
export function siteReportSelect (data) {
  return fetchPost('/site/ReportSelect',data)
};
/**
 * 评论举报
 */
export function sitePostReport (data) {
  return fetchPost('/site/Report',data)
};
/**
 * 举报原因选项
 */
export function siteReportingReason () {
  return fetchGet('/site/ReportingReason')
};
/**
 * 举报人选项
 */
export function siteUserWhoReported () {
  return fetchGet('/site/UserWhoReported')
};
/**
  获取报告和回复的状态
 */
 export function siteReportAndReviweStatus () {
  return fetchGet('/site/ReportAndReviweStatus')
};
/**
 * 发送邮件
 */
export function siteSendEmail (data) {
  return fetchPost('/site/SendEmail',data)
};
/**
 * 获取修改密码token
 */
export function siteForgotPassword (data) {
  return fetchGet('/site/ForgotPassword',data)
};
/**
 * 修改密码
 */
export function siteResetPassword (data) {
  return fetchPost('/site/ResetPassword',data)
};
/**
 * 保存商家FindReviewer发送的信息
 */
export function siteFindReviewers (data) {
  return fetchGet('/site/FindReviewers',data)
};
/**
 * 获取国家或地区的名称和区号
 */
export function siteCountry (data) {
  return fetchGet('/site/Country',data)
};
/**
 * 获取商家基本信息
 */
export function siteProfileBasic (data) {
  return fetchGet('/site/ProfileBasic',data)
};
/**
 * 修改商家基本信息
 */
export function siteEditProfileBasic (data) {
  return fetchPost('/site/ProfileBasic',data)
};
/**
 * 获取新消息数量
 */
export function siteNewAndEditReviews () {
  return fetchGet('/site/NewAndEditReviews')
};
/**
 * 修改邮箱
 */
export function siteProfileWorkEmail (data) {
  return fetchPost('/site/ProfileWorkEmail',data)
};
/**
 * 修改邮箱确认
 */
export function siteProfileWorkEmailConfirm (data) {
  return fetchGet('/site/ProfileWorkEmailConfirm',data)
};
/**
 * 获取网站信息
 */
export function siteWebSiteInfo (data) {
  return fetchGet('/site/WebSiteInfo',data)
};