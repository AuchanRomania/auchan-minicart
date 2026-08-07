import { useEffect, useRef } from 'react'
import { usePixel } from 'vtex.pixel-manager'

import { transformOrderFormItems } from './pixelHelper'

function isOrderFormItemsReady(orderFormItems: OrderForm['items'] | undefined) {
  if (!orderFormItems) return false

  if (
    orderFormItems.length > 0 &&
    orderFormItems[orderFormItems.length - 1]?.additionalInfo === undefined
  ) {
    return false
  }

  return true
}

const useViewCartPixel = (
  isOpen: boolean,
  orderFormItems: OrderForm['items']
) => {
  const { push } = usePixel()
  const emittedForOpenRef = useRef(false)

  useEffect(() => {
    if (!isOpen) {
      emittedForOpenRef.current = false
      return
    }

    if (emittedForOpenRef.current) {
      return
    }

    if (!isOrderFormItemsReady(orderFormItems)) {
      return
    }

    emittedForOpenRef.current = true
    push({
      event: 'viewCart',
      items: transformOrderFormItems(orderFormItems),
    })
  }, [isOpen, orderFormItems, push])
}

export default useViewCartPixel
