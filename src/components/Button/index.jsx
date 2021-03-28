import './styles.css'

export const Button = (props) => {
    return (
        <button disabled={props.disabled} className="button" onClick={props.onClick}>{props.label}</button>
    )
}