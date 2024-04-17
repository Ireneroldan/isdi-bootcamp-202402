function RoundButton(props) {
    return <button className={`rounded-[5px] border-[1px] border-black my-[10px] ${props.className}`} type={props.type} onClick={props.onClick}>{props.children || 'Button'}</button>
}
export default RoundButton