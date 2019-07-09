export function selectFilterOption(input, option) {
	let children = option.props.children
	if (children != null){
		return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
	}
	return ""
}