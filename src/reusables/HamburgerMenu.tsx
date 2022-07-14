import { IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { IoMdMenu } from "react-icons/io"

export type HamburgerMenuItem = {
  icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>
  name: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export type HamburgerMenuProps = {
  menuList: HamburgerMenuItem[]
  onClose?: () => void
}

export const HamburgerMenu = ({ menuList, onClose }: HamburgerMenuProps) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<IoMdMenu color="white" />}
        variant='filled'
        color='white'
        backgroundColor='rgb(37, 50, 106)'
      />
      <MenuList backgroundColor='rgb(37, 50, 106)'>
        {menuList.map(m => (
          <MenuItem fontSize='1rem' color='white' icon={m.icon} onClick={m.onClick} _hover={{ bg: 'primary.700' }} _focus={{ bg: 'primary.700' }}>
            {m.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}