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
    path: '/manage',
    title: (<span><Icon type="bars" /><span>ACCOUNTS</span></span>),
    items: [
      {
        type: 'link', 
        path: '/manage/accounts',
        title: 'Accounts',
      },
    ],
  },
]