import React, { useState } from 'react'
import { Uploader, Cell } from '@nutui/nutui-react'
import { FileItem } from '../../file-item'

const Demo1 = () => {
  const [list, setList] = useState<FileItem[]>([
    {
      url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
      uid: 1,
    },
    {
      url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
      uid: 2,
    },
  ])
  function sleep(time: number) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve()
      }, time)
    })
  }
  async function mockUpload(file: File) {
    await sleep(3000)
    return {
      url: URL.createObjectURL(file),
    } as FileItem
  }

  return (
    <>
      <Cell style={{ flexWrap: 'wrap', paddingBottom: '0px' }}>
        <Uploader
          uploadLabel="商品主图"
          value={list}
          onChange={setList}
          upload={(file: File) => mockUpload(file)}
          style={{
            marginInlineEnd: '10px',
            marginBottom: '10px',
          }}
          maxCount={5}
          multiple
        />
      </Cell>
    </>
  )
}
export default Demo1
