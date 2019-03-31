import React, { Component } from 'react';
import Select from 'react-select';
import { Label } from '../../styles/Input';

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
            <div>
                <Label htmlFor="category" text="Category" />
                <Select
                    name="category"
                    isSearchable={false}
                    options={this.options}
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