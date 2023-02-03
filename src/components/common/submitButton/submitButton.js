export const SubmitButton = props => {
    let enabledLabel = props.enabledLabel || 'Submit'
    let disabledLabel = props.disabledLabel || 'Submitting...'
    return props.isSubmitting
    ?<button disabled className="btn btn-info" >{disabledLabel}</button>
    :<button disabled={props.isDisabled} type="submit" className="btn btn-primary" >{enabledLabel}</button>
}