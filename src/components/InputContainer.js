import React, { Component } from 'react';

class InputContainer extends Component {
  render() {
    return (
        <div className="input-container">
            <form>
                <label>
                Name:
                <input type="text" name="name" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
  }
}

export default InputContainer;
