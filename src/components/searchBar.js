import React from "react";
import PropTypes from "prop-types";
import "../css/MainView.css";
import Autocomplete from "react-autocomplete";

class Search extends React.Component {
  render() {
    return (
      <Autocomplete
        items={[]}
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
        value={this.props.value}
        onChange={e => this.setState({ value: e.target.value })}
        onSelect={value => this.setState({ value })}
      />
    );
  }
}

Search.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string
};

Search.defaultProps = {
  value: ""
};

export default Search;
