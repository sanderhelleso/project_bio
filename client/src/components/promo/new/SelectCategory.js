import React, { Component } from 'react';
import Select from 'react-select';
import { Label } from '../../styles/Input';
import { categories } from '../../../lib/data';

class SelectCategory extends Component {
    options = categories;

    handleChange = e => {
        this.props.handleChange(e.value);
    }

    formatGroupLabel = options => (
        <span>{options.label}</span>
    );

    render() {
        return (
            <div>
                <Label htmlFor="category" text="Category" />
                <Select
                    name="category"
                    value={this.options.find(o => o.value === this.props.category)}
                    options={this.options}
                    onChange={e => this.handleChange(e)}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: '4px',
                        outline: 'none',
                        transform: '0.3s ease-in-out',
                        colors: {
                        ...theme.colors,
                          primary: '#6927ff',
                        },
                    })}
                />
            </div>
        )
    }
}

export default SelectCategory;