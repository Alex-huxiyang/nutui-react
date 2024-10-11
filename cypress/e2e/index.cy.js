// import './taro/base.cy'
// import './taro/layout.cy'
import './taro/nav.cy'

Cypress.on('uncaught:exception', (err, runnable) => {
  // 返回 false 以阻止 Cypress 失败测试
  return false
})
