import './styles.css'

export const TextInput = (props) => {
    return (
        <input
            className="text-input"
            type="search"
            onChange={props.handleChange}
            value={props.searchValue}
            placeholder="Type your search"
        />
    )
}