import React from 'react'

const Form = (props) => {
    return (
        <div>
            <form onSubmit={props.submit}>
                <div>
                    Name: <input
                        value={props.nameValue}
                        onChange={props.nameChange}
                    />
                </div>
                <div>
                    Number: <input
                        value={props.numberValue}
                        onChange={props.numberChage}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default Form