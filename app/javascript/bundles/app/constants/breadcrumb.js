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
      }
    },
    // Home > Userservice
    userservice: {
      title: 'Userservice',
      // Home > Userservice > Accounts
      accounts: {
        title: 'Accounts',
        // Home > Userservice > Accounts > Create
        new: {
          title: 'Create',
        },
      },
      // Home > Userservice > Departments
      departments: {
        title: 'Departments',
        // Home > Userservice > Departments > Create
        new: {
          title: 'Create',
        },
      },
    }
  }
})