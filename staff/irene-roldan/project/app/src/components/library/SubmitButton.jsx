import RoundButton from './RoundButton'

function SubmitButton(props) {
    return <RoundButton type="submit">{props.children || 'Submit'}</RoundButton>
}

export default SubmitButton