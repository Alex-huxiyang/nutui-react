import React, { useState } from 'react'
import { Popup, Cell } from '@nutui/nutui-react'
import { Heart } from '@nutui/icons-react'

const Demo3 = () => {
  const [showIcon, setShowIcon] = useState(false)
  const [showIconPosition, setShowIconPosition] = useState(false)
  const [showIconDefine, setShowIconDefine] = useState(false)

  return (
    <>
      <Cell
        title="关闭图标"
        onClick={() => {
          setShowIcon(true)
        }}
      />
      <Cell
        title="图标位置"
        onClick={() => {
          setShowIconPosition(true)
        }}
      />
      <Cell
        title="自定义图标"
        onClick={() => {
          setShowIconDefine(true)
        }}
      />
      <Popup
        round
        closeable
        visible={showIcon}
        left="返回"
        title="我是标题"
        position="bottom"
        onClose={() => {
          setShowIcon(false)
        }}
      />
      <Popup
        round
        closeable
        visible={showIconPosition}
        closeIconPosition="top-left"
        position="bottom"
        onClose={() => {
          setShowIconPosition(false)
        }}
      />
      <Popup
        round
        closeable
        closeIcon={<Heart width="15px" height="15px" />}
        visible={showIconDefine}
        style={{ height: '100%' }}
        position="bottom"
        onClose={() => {
          setShowIconDefine(false)
        }}
      />
    </>
  )
}
export default Demo3
