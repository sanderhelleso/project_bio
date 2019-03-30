import React, { Component } from 'react';
import Select from 'react-select';

export default class SelectCategory extends Component {
    options = [
        { value: 'fashion', label: '👗 Fashion' },
        { value: 'car', label: '🚘 Vehicle' },
    ];

    formatGroupLabel = options => (
        <div>
          <span>{options.label}</span>
        </div>
    );

    render() {
        return (
            <Select
                isSearchable={false}
                options={this.options}
                defaultValue={this.options[1]}
                formatGroupLabel={this.formatGroupLabel}
            />
        )
    }
}

const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
  };