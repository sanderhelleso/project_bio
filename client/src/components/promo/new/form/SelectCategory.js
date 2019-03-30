import React, { Component } from 'react';
import Select from 'react-select';
import { Label } from '../../../styles/Input';

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
                />
            </div>
        )
    }
}