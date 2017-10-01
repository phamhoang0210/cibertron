import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'

class TextEditable extends React.Component {
  constructor() {
    super()

    _.bindAll(this, [
      'emitChange',
    ])
  }

  shouldComponentUpdate(nextProps) {
    return (
      !this.editableElement
      || ( nextProps.html !== this.editableElement.innerHTML
        && nextProps.html !== this.props.html )
      || this.props.disabled !== nextProps.disabled
    )
  }

  componentDidUpdate() {
    if ( this.editableElement && this.props.html !== this.editableElement.innerHTML ) {
      this.editableElement.innerHTML = this.props.html
    }
  }

  emitChange(evt) {
    if (!this.editableElement) return
    const textContent = this.editableElement.innerText || this.editableElement.textContent
    const html = this.editableElement.innerHTML
    if (this.props.onChange && textContent !== this.lastTextContent && html !== this.props.html) {
      this.props.onChange(textContent)
    }
    this.lastTextContent = textContent
  }

  render() {
    const { className, tagName, html, ...props } = this.props
    const itemClassNames = classNames('contenteditable text-editable', className)

    return React.createElement(
      tagName || 'div',
      {
        ...props,
        className: itemClassNames,
        ref: (e) => this.editableElement = e,
        onBlur: this.emitChange,
        contentEditable: !this.props.disabled,
        dangerouslySetInnerHTML: {__html: html},
      },
      this.props.children)
  }
}

export default TextEditable