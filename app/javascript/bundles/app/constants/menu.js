import React from 'react'
import {Icon} from 'antd'
export const menuData = [
 {
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