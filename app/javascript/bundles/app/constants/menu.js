import React from 'react'
import {Icon} from 'antd'
export const menuData = [
  {
    type: 'subMenu',
    path: '/cronus',
    title: 'CRONUS',
    items: [
      { 
        type: 'link',
        path: '/cronus/campaigns',
        title: 'Campaigns'
      }, { 
        type: 'link',
        path: '/cronus/nodes',
        title: 'Nodes',
      }, { 
        type: 'link',
        path: '/cronus/channels',
        title: 'Channels',
      }, {
        type: 'link',
        path: '/cronus/providers',
        title: 'Providers',
      }, {
        type: 'link',
        path: '/cronus/categories',
        title: 'Categories',
      }, {
        type: 'itemGroup',
        title: 'Import data',
        path: '/cronus/imports',
        items: [
          {
            type: 'link',
            path: '/cronus/leads/new',
            title: 'Leads',
          }, {
            type: 'link',
            path: '/cronus/campaign_bydates',
            title: 'Campaign bydates',
          }
        ]
      }
    ],
  }, {
    type: 'subMenu',
    path: '/sol',
    title: 'SOL',
    items: [
      {
        type: 'link', 
        path: '/sol/discounts',
        title: 'Discounts',
      },
      {
        type: 'link', 
        path: '/sol/catalogs',
        title: 'Catalogs',
      },
      {
        type: 'link', 
        path: '/sol/promos',
        title: 'Promos',
      }, {
        type: 'link', 
        path: '/sol/courses',
        title: 'Courses',
      }, {
        type: 'link', 
        path: '/sol/combos',
        title: 'Combos',
      }, {
        type: 'link', 
        path: '/sol/targets',
        title: 'Targets',
      }, {
        type: 'link', 
        path: '/sol/systemlogs',
        title: 'System Logs',
      },
    ],
  }, {
    type: 'subMenu',
    path: '/userservice',
    title: 'USERSERVICE',
    items: [
      {
        type: 'link', 
        path: '/userservice/accounts',
        title: 'Accounts',
      }, {
        type: 'link', 
        path: '/userservice/departments',
        title: 'Departments',
      },
    ],
  }, {
    type: 'subMenu',
    path: '/nauh',
    title: 'AFTERSALES',
    items: [
      {
        type: 'link', 
        path: '/nauh/leads',
        title: 'Leads',
      } , {
        type: 'link', 
        path: '/nauh/orders',
        title: 'Orders',
      } , {
        type: 'link', 
        path: '/nauh/sources',
        title: 'Sources',
      }
    ]
  }, {
    type: 'subMenu',
    path: '/hera',
    title: 'HERA',
    items: [
      {
        type: 'link', 
        path: '/hera/landing_pages',
        title: 'Landing pages',
      }, {
        type: 'link', 
        path: '/hera/domains',
        title: 'Domains',
      }
    ]
  }
]