import React from 'react'
import {Icon} from 'antd'
export const menuData = [
  {
    type: 'subMenu',
    path: '/cronus',
    title: (<span><Icon type='star' /><span>Cronus</span></span>),
    items: [
      { 
        type: 'link',
        path: '/cronus/campaigns',
        title: 'Campaigns'
      },
      { 
        type: 'link',
        path: '/cronus/nodes',
        title: 'Nodes',
      },
      { 
        type: 'link',
        path: '/cronus/channels',
        title: 'Channels',
      },
      {
        type: 'link',
        path: '/cronus/providers',
        title: 'Providers',
      },
      {
        type: 'link',
        path: '/cronus/categories',
        title: 'Categories',
      },
    ],
  },
  {
    type: 'subMenu',
    path: '/userservice',
    title: (<span><Icon type='user' /><span>Userservice</span></span>),
    items: [
      {
        type: 'link', 
        path: '/userservice/accounts',
        title: 'Accounts',
      },
      {
        type: 'link', 
        path: '/userservice/departments',
        title: 'Departments',
      },
    ],
  }
]