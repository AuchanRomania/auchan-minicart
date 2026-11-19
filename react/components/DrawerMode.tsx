import React, {
  FC,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { Drawer, BackdropMode } from 'vtex.store-drawer'
import { useDrawer } from 'vtex.store-drawer/DrawerContext'
import { ResponsiveValuesTypes } from 'vtex.responsive-values'
import { PixelEventTypes } from 'vtex.pixel-manager'

import MinicartIconButton from './MinicartIconButton'
import { useMinicartCssHandles } from './CssHandlesContext'

const DRAWER_CLOSE_ICON_HEIGHT = 58

export const CSS_HANDLES = [
  'minicartSideBarContentWrapper',
  'openIconContainer',
] as const

interface Props {
  Icon: React.ComponentType
  maxDrawerWidth: number | string
  drawerSlideDirection: SlideDirectionType
  quantityDisplay: QuantityDisplayType
  itemCountMode: MinicartTotalItemsType
  backdropMode?: ResponsiveValuesTypes.ResponsiveValue<BackdropMode>
  customPixelEventId?: string
  customPixelEventName?: PixelEventTypes.EventName
}

type OpenDrawer = () => void

const DrawerOpener: FC<{
  openRef: MutableRefObject<OpenDrawer | undefined>
}> = ({ openRef }) => {
  const { open } = useDrawer()

  useEffect(() => {
    openRef.current = open
  }, [open, openRef])

  return null
}

const DrawerMode: FC<Props> = ({
  Icon,
  children,
  maxDrawerWidth,
  quantityDisplay,
  itemCountMode,
  drawerSlideDirection,
  backdropMode = 'visible',
  customPixelEventId,
  customPixelEventName,
}) => {
  const { handles } = useMinicartCssHandles()
  const openDrawerRef = useRef<OpenDrawer>()
  const openDrawer = useCallback(() => openDrawerRef.current?.(), [])

  return (
    <>
      <div className={`pa4 pointer ${handles.openIconContainer}`}>
        <MinicartIconButton
          Icon={Icon}
          itemCountMode={itemCountMode}
          quantityDisplay={quantityDisplay}
          onClick={openDrawer}
        />
      </div>
      <Drawer
        maxWidth={maxDrawerWidth}
        backdropMode={backdropMode}
        slideDirection={drawerSlideDirection}
        customPixelEventId={customPixelEventId}
        customPixelEventName={customPixelEventName}
        customIcon={<DrawerOpener openRef={openDrawerRef} />}
      >
        <div
          className={`${handles.minicartSideBarContentWrapper} flex flex-column w-100 h-100`}
          style={{
            height: window.innerHeight - DRAWER_CLOSE_ICON_HEIGHT,
          }}
        >
          {children}
        </div>
      </Drawer>
    </>
  )
}

export default DrawerMode
