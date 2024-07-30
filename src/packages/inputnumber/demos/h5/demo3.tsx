import React from 'react'
import { InputNumber, Toast } from '@nutui/nutui-react'

const Demo3 = () => {
  const overlimit = (e) => {
    // console.log(e)
    Toast.show({ content: '超出限制事件触发', icon: 'warn' })
  }
  return (
    <InputNumber
      defaultValue={10}
      min={10}
      max={20}
      onOverlimit={overlimit}
      onChange={(e) => {
        console.log(e)
      }}
    />
  )
}
export default Demo3
