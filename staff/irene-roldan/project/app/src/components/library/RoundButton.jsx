function RoundButton(props) {
    return <button className={`flex-shrink-0 bg-orange-500 hover:bg-orange-300 border-orange-500 hover:border-orange-300 text-sm border-4 text-white py-1 px-2 rounded ${props.className}`} type={props.type} onClick={props.onClick}>{props.children || 'Button'}</button>
}

export default RoundButton