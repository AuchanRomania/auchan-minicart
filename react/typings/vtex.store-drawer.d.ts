declare module 'vtex.store-drawer' {
  const Drawer: React.FC<any>
  type BackdropMode = 'visible' | 'none'
}

declare module 'vtex.store-drawer/DrawerContext' {
  export const useDrawer: () => {
    isOpen: boolean
    open: () => void
    close: () => void
  }
}
