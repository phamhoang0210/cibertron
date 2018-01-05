import React from 'react'
import {Icon} from 'antd'
export const menuData = [
  {
    type: 'subMenu',
    path: '/cronus',
    title: (<span><Icon type="bars" /><span>CRONUS</span></span>),
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
    title: (<span><Icon type="bars" /><span>SOL</span></span>),
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
    path: '/nauh',
    title: (<span><Icon type="bars" /><span>AFTERSALES</span></span>),
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
      }, {
        type: 'itemGroup',
        title: 'Settings',
        path: '/settings',
        items: [
          {
            type: 'link',
            path: '/nauh/settings/ipphones',
            title: 'Ipphone',
          }
        ]
      }
    ]
  }, {
    type: 'subMenu',
    path: '/izzy',
    title: (<span><Icon type="bars" /><span>EES</span></span>),
    items: [
      {
        type: 'link', 
        path: '/izzy/campaigns',
        title: 'Campaigns',
      } , {
        type: 'link', 
        path: '/izzy/lists',
        title: 'Lists',
      } , {
        type: 'link', 
        path: '/izzy/templates',
        title: 'Templates',
      } , {
        type: 'link', 
        path: '/izzy/senders',
        title: 'Senders',
      },
    ]
  }, {
    type: 'subMenu',
    path: '/hera',
    title: (<span><Icon type="bars" /><span>HERA</span></span>),
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
  }, {
    type: 'subMenu',
    path: '/userservice',
    title: (<span><Icon type="bars" /><span>USERSERVICE</span></span>),
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
    title: (<span><Icon type="bars" /><span>AUTHSERVICE</span></span>),
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
  }
]