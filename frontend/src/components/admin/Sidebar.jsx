import { Button, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  RiAddCircleFill,
  RiDashboardFill,
  RiEyeFill,
  RiUser3Fill,
} from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';

const LinkButton = ({ url, Icon, name, active }) => (
  <Link to={`/admin/${url}`}>
    <Button colorScheme={active ? 'linkedin' : 'black'} variant={'ghost'}>
      <Icon style={{ margin: '4px' }} />
      {name}
    </Button>
  </Link>
);
const Sidebar = () => {
  const location = useLocation();
  return (
    <VStack
      spacing={'8'}
      p={'16'}
      boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
    >
      <LinkButton
        url="dashboard"
        Icon={RiDashboardFill}
        name={'DashBoard'}
        active={(location.pathname === '/admin/dashboard')}
      />
      <LinkButton
        url="createcourse"
        Icon={RiAddCircleFill}
        name={'Create Course'}
        active={(location.pathname === '/admin/createcourse')}
      />
      <LinkButton
        url="courses"
        Icon={RiEyeFill}
        name={'Courses'}
        active={(location.pathname === '/admin/courses')}
      />
      <LinkButton
        url="users"
        Icon={RiUser3Fill}
        name={'Users'}
        active={(location.pathname === '/admin/users')}
      />
    </VStack>
  );
};

export default Sidebar;
