import Immutable from 'immutable'

export const breadcrumbData = Immutable.fromJS({
  // Home
  '': {
    title: 'Home',
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
      // Home > SOL > Group Catalogs
      group_catalogs: {
        title: 'Group Catalogs',
        // Home > SOL > Group Catalogs > Create
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
      // courses: {
      //   title: 'Courses',
      //   // Home > SOL > Promos > Create
      //   new: {
      //     title: 'Create',
      //   },
      // },
      // combos: {
      //   title: 'Combos',
      //   // Home > SOL > Promos > Create
      //   new: {
      //     title: 'Create',
      //   },
      // },
      targets: {
        title: 'Targets',
        // Home > SOL > Promos > Create
        new: {
          title: 'Create',
        },
      },
      prizes: {
        title: 'Prizes',
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
    // Home > EES
    ees: {
      title: 'EES',
      // Home > EES > Campaigns
      campaigns: {
        title: 'Campaigns',
        // Home > EES > Campaigns > Create
        new: {
          title: 'Create',
        }
      },
      logs: {
        title: 'Logs'
      },
      // Home > EES > Lists
      lists: {
        title: 'Contacts',
        // Home > EES > Lists > Create
        new: {
          title: 'Create',
        }
      },
      // Home > EES > Templates
      templates: {
        title: 'Templates',
        // Home > EES > Templates > Create
        new: {
          title: 'Create',
        }
      },
      senders: {
        title: 'Senders',
        // Home > EES > Senders > Create
        new: {
          title: 'Create',
        }
      }
    },
    // Home > LP
    hera: {
      title: 'LP',
      // Home > LP > Landingpages
      Landingpages: {
        title: 'Landingpages',
        // Home > LP > Landingpages > Create
        new: {
          title: 'Create'
        }
      }
    },
    // Home > CAMPAIGNS
    captain: {
      title: 'CAMPAIGNS',
      // Home > CAMPAIGNS > Campaigns
      campaigns: {
        title: 'Campaigns',
        // Home > CAMPAIGNS > Campaigns > Create
        new: {
          title: 'Create'
        }
      }
    }
  }
})