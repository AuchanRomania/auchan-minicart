import { useEffect, useRef } from 'react'
import { usePixel } from 'vtex.pixel-manager'

import { transformOrderFormItems } from './pixelHelper'

const useViewCartPixel = (
  isOpen: boolean,
  orderFormItems: OrderForm['items']
) => {
  const { push } = usePixel()
  const emittedForCurrentOpen = useRef(false)

  useEffect(() => {
    if (!isOpen) {
      emittedForCurrentOpen.current = false
      return
    }

    if (emittedForCurrentOpen.current || !orderFormItems) {
      return
    }

    emittedForCurrentOpen.current = true
    push({
      event: 'viewCart',
      items: transformOrderFormItems(orderFormItems),
    })
  }, [push, isOpen, orderFormItems])
}

export default useViewCartPixel
