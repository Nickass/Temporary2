import sc from 'styled-components';
import { NavLink as Link } from 'react-router-dom';

export const Header = sc.header`

`;

export const Logo = sc(Link)`
  display: block;
  max-width: 800px;
  margin: 0 auto 0;
  font-size: 38px;
  color: #170606;
  font-weight: bold;
  text-decoration: none;
`;