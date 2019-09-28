import React from "react";
import PropTypes from "prop-types";
import "../css/MainView.css";
import Autocomplete from "react-autocomplete";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  render() {
    return (
      <Autocomplete
        style={{ width: "500px" }}
        items={[
          { id: "foo", label: "foo" },
          { id: "bar", label: "bar" },
          { id: "baz", label: "baz" }
        ]}
        shouldItemRender={(item, value) =>
          item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
        }
        inputProps={{ placeholder: this.props.placeholder }}
        getItemValue={item => item.label}
        renderItem={(item, highlighted) => (
          <div
            key={item.id}
            className={
              highlighted ? "autoCompleteItemHover" : "autoCompleteItem"
            }
          >
            {item.label}
          </div>
        )}
        value={this.state.value}
        onChange={e => this.setState({ value: e.target.value })}
        onSelect={value => this.setState({ value })}
      />
    );
  }
}

Search.propTypes = {
  placeholder: PropTypes.string
};

export default Search;
