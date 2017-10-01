export function selectFilterOption(input, option) {
  return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
}