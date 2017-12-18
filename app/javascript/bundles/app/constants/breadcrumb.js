import Immutable from 'immutable'

export const breadcrumbData = Immutable.fromJS({
  // Home
  '': {
    title: 'Home',
    // Home > Cronus
    cronus: {
      title: 'Cronus',
      // Home > Cronus > Campaigns
      campaigns: {
        title: 'Campaigns',
        // Home > Cronus > Campaigns > Create
        new: {
          title: 'Create',
        },
      },
      // Home > Cronus > Nodes
      nodes: {
        title: 'Nodes',
        // Home > Cronus > Nodes > Create
        new: {
          title: 'Create',
        },
      },
      // Home > Cronus > Channels
      channels: {
        title: 'Channels',
        // Home > Cronus > Channels > Create
        new: {
          title: 'Create',
        },
      },
      // Home > Cronus > Providers
      providers: {
        title: 'Providers',
        // Home > Cronus > Providers > Create
        new: {
          title: 'Create',
        },
      },
      // Home > Cronus > Categories
      categories: {
        title: 'Categories',
        // Home > Cronus > Categories > Create
        new: {
          title: 'Create',
        },
      },
      // Home > Cronus > Campaign bydates
      campaign_bydates: {
        title: 'Campaign bydates',
        // Home > Cronus > Campaign bydates > Create
        new: {
          title: 'Create'
        }
      },
      // Home > Cronus > Leads
      leads: {
        title: 'Leads',
        // Home > Cronus > Leads > New
        new: {
          title: 'Create'
        }
      }
    },
    // Home > SOL
    sol: {
      title: 'SOL',
      // Home > SOL > Discount
      discounts: {
        title: 'Discounts',
        // Home > SOL > Dscount > Create
        new: {
          title: 'Create',
        }
      },
      // Home > SOL > Catalog
      catalogs: {
        title: 'Catalogs',
        // Home > SOL > Catalog > Create
        new: {
          title: 'Create',
        }
      },
      // Home > SOL > Promos
      promos: {
        title: 'Promos',
        // Home > SOL > Promos > Create
        new: {
          title: 'Create',
        },
      },
      courses: {
        title: 'Courses',
        // Home > SOL > Promos > Create
        new: {
          title: 'Create',
        },
      },
      combos: {
        title: 'Combos',
        // Home > SOL > Promos > Create
        new: {
          title: 'Create',
        },
      },
      targets: {
        title: 'Targets',
        // Home > SOL > Promos > Create
        new: {
          title: 'Create',
        },
      },
      systemlogs: {
        title: 'System Logs',
        // Home > SOL > Promos > Create
      },
    },
    // Home > Authservice
    authservice: {
      title: 'Authservice',
      // Home > Authservice > Accounts
      accounts: {
        title: 'Accounts',
        // Home > Authservice > Accounts > Create
        new: {
          title: 'Create',
        },
      },
      // Home > Authservice > Departments
      departments: {
        title: 'Departments',
        // Home > Authservice > Departments > Create
        new: {
          title: 'Create',
        },
      },
    },
    // Home > Authservice
    authservice: {
      title: 'Userservice',
      users: {
        title: 'Users'
      },
    },
    // Home > Nauh
    nauh: {
      title: 'Nauh',
      // Home > Nauh > Leads
      leads: {
        title: 'Leads',
        // Home > Nauh > Leads > Create
        new: {
          title: 'Create',
        }
      },
      // Home > Nauh > Orders
      orders: {
        title: 'Orders',
        // Home > Nauh > Orders > Create
        new: {
          title: 'Create',
        }
      },
      // Home > Nauh > Sources
      sources: {
        title: 'Sources',
      }
    },
    // Home > Izzy
    izzy: {
      title: 'Izzy',
      // Home > Izzy > Campaigns
      campaigns: {
        title: 'Campaigns',
        // Home > Izzy > Campaigns > Create
        new: {
          title: 'Create',
        }
      },
      // Home > Izzy > Lists
      lists: {
        title: 'Lists',
        // Home > Izzy > Lists > Create
        new: {
          title: 'Create',
        }
      },
      // Home > Izzy > Templates
      templates: {
        title: 'Templates',
        // Home > Izzy > Templates > Create
        new: {
          title: 'Create',
        }
      }
    },
    // Home > Hera
    hera: {
      title: 'Hera',
      // Home > Hera > Landingpages
      Landingpages: {
        title: 'Landingpages',
        // Home > Hera > Landingpages > Create
        new: {
          title: 'Create'
        }
      }
    }
  }
})