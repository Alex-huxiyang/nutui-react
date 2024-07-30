import React, { useState } from 'react'
import { InputNumber, Toast } from '@nutui/nutui-react'

const Demo8 = () => {
  const [inputValue, setInputValue] = useState(0)
  const onChange = (value: string | number) => {
    Toast.show({ icon: 'loading', content: '异步演示2秒后更改' })
    setTimeout(() => {
      setInputValue(Number(value))
      Toast.clear()
    }, 200)
  }
  const overlimit = (e) => {
    console.log(e)
    Toast.show({ content: '超出限制事件触发', icon: 'warn' })
  }
  return (
    <InputNumber
      onOverlimit={overlimit}
      value={inputValue}
      min={-6}
      onChange={onChange}
      async
      max={10}
    />
  )
}
export default Demo8
