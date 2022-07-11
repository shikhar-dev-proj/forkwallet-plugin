import { Menu, MenuButton, IconButton, MenuList, MenuItem } from "@chakra-ui/react"
import { IconType } from "react-icons"
import { BsFillShieldLockFill } from "react-icons/bs"
import { IoMdGitNetwork, IoMdMenu } from "react-icons/io"

export type HamburgerMenuItem = {
  icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>
  name: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export type HamburgerMenuProps = {
  menuList: HamburgerMenuItem[]
}

export const HamburgerMenu = ({ menuList }: HamburgerMenuProps) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<IoMdMenu />}
        variant='filled'
        backgroundColor='rgb(37, 50, 106)'
      />
      <MenuList backgroundColor='rgb(37, 50, 106)'>
        {menuList.map(m => (
          <MenuItem fontSize='1rem' icon={m.icon} onClick={m.onClick}>
            {m.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}