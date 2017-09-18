import React from 'react'
import {Icon} from 'antd'
export const menuData = [
  {
    type: 'subMenu',
    path: '/cronus',
    title: (<span><Icon type='star' /><span>CRONUS</span></span>),
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
      {
        type: 'link',
        path: '/cronus/campaign_bydates',
        title: 'Campaign bydates',
      },
    ],
  },

  {
    type: 'subMenu',
    path: '/sol',
    title: (<span><Icon type='solution' /><span>SOL</span></span>),
    items: [
      {
        type: 'link', 
        path: '/sol/promos',
        title: 'Promos',
      },
      {
        type: 'link', 
        path: '/sol/courses',
        title: 'Courses',
      },
      {
        type: 'link', 
        path: '/sol/combos',
        title: 'Combos',
      },
      {
        type: 'link', 
        path: '/sol/targets',
        title: 'Targets',
      },
      {
        type: 'link', 
        path: '/sol/systemlogs',
        title: 'System Logs',
      },
    ],
  },

  {
    type: 'subMenu',
    path: '/userservice',
    title: (<span><Icon type='user' /><span>USERSERVICE</span></span>),
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
  },
]