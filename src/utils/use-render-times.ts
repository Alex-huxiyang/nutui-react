import { useRef, useEffect, HTMLAttributes } from 'react'
import { ActionSheetProps } from '@/packages/actionsheet'
import { BasicTableProps } from '@/packages/table/types'

function useRenderTimes(
  props:
    | (Partial<ActionSheetProps> &
        Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onSelect'>)
    | (Partial<BasicTableProps> & HTMLAttributes<HTMLDivElement>)
) {
  const totalRenders = useRef(0)
  const unnecessaryRenders = useRef(0)

  totalRenders.current += 1

  const prevProps = useRef(props)

  useEffect(() => {
    if (deepEqual(prevProps.current, props)) {
      unnecessaryRenders.current += 1
    }
    prevProps.current = props
  })

  function deepEqual(
    obj1: { [x: string]: any } | null,
    obj2: { [x: string]: any } | null
  ) {
    if (obj1 === obj2) return true

    if (
      typeof obj1 !== 'object' ||
      typeof obj2 !== 'object' ||
      obj1 === null ||
      obj2 === null
    ) {
      return false
    }

    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)

    if (keys1.length !== keys2.length) return false

    for (const key of keys1) {
      if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
        return false
      }
    }

    return true
  }

  return [totalRenders.current, unnecessaryRenders.current]
}

export default useRenderTimes
