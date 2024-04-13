import RoundButton from './RoundButton'

function SubmitButton(props) {
    return <RoundButton className="bg-[#475569]" type="submit">{props.children || 'Submit'}</RoundButton>
}
export default SubmitButton