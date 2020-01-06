import React from 'react'
import {Icon} from 'antd'
export const menuData = [
  {
    type: 'subMenu',
    path: '/userservice',
    title: (<span><Icon type="bars" /><span>USER INFO</span></span>),
    items: [
      {
        type: 'link', 
        path: '/userservice/users',
        title: 'Users',
      },
    ],
  }, {
    type: 'subMenu',
    path: '/authservice',
    title: (<span><Icon type="bars" /><span>ACCOUNTS</span></span>),
    items: [
      {
        type: 'link', 
        path: '/authservice/accounts',
        title: 'Accounts',
      },
      {
        type: 'link', 
        path: '/authservice/departments',
        title: 'Departments',
      }, {
        type: 'link', 
        path: '/authservice/companies',
        title: 'Companies',
      }, {
        type: 'link', 
        path: '/authservice/roles',
        title: 'Roles',
      },
    ],
  },
]