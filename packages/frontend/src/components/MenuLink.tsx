import { MenuItem, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const MenuLink = ({
  href,
  title,
  onClick,
}: {
  href: string
  title: string
  onClick?: () => void
}) => (
  <Link to={href}>
    <MenuItem onClick={onClick}>
      <Typography>{title}</Typography>
    </MenuItem>
  </Link>
)
export default MenuLink
