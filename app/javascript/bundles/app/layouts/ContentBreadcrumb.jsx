import React from 'react'
import { Breadcrumb } from 'antd'
import { breadcrumbData } from 'app/constants/breadcrumb'

class ContentBreadcrumb extends React.Component {
  render() {
    const {location} = this.props
    const pathname = location.pathname || ''
    const paths = pathname.split('/')
    const _paths = paths.map((path, index) => (
      paths.slice(0, index+1)
    ))

    return (
      <Breadcrumb separator=">">
        {_paths.map(path => {
          const breadcrumb = breadcrumbData.getIn(path)
          let link = path.join('/')
          if (link == '') { link = 'http://localhost:3000/'}
          return (
            <Breadcrumb.Item key={link}>
              {breadcrumb && (
                <a href={link}>{breadcrumb.get('title')}</a>
              )}
            </Breadcrumb.Item>
          )
        })}
      </Breadcrumb>
    )
  }
}

export default ContentBreadcrumb