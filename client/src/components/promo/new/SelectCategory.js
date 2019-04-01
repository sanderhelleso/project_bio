import React, { Component } from 'react';
import Select from 'react-select';
import { Label } from '../../styles/Input';

class SelectCategory extends Component {
    options = [ 
        { value: 'Animals & Pet Supplies', label: 'Animals & Pet Supplies' },
        { value: 'Apparel & Accessories', label: 'Apparel & Accessories' },
        { value: 'Arts & Entertainment', label: 'Arts & Entertainment' },
        { value: 'Baby & Toddler', label: 'Baby & Toddler' },
        { value: 'Business & Industrial', label: 'Business & Industrial' },
        { value: 'Cameras & Optics', label: 'Cameras & Optics' },
        { value: 'Electronics', label: 'Electronics' },
        { value: 'Food, Beverages & Tobacco', label: 'Food, Beverages & Tobacco' },
        { value: 'Furniture', label: 'Furniture' },
        { value: 'Hardware', label: 'Hardware' },
        { value: 'Health & Beauty', label: 'Health & Beauty' },
        { value: 'Home & Garden', label: 'Home & Garden' },
        { value: 'Luggage & Bags', label: 'Luggage & Bags' },
        { value: 'Mature', label: 'Mature' },
        { value: 'Media', label: 'Media' },
        { value: 'Office Supplies', label: 'Office Supplies' },
        { value: 'Religious & Ceremonial', label: 'Religious & Ceremonial' },
        { value: 'Software', label: 'Software' },
        { value: 'Sporting Goods', label: 'Sporting Goods' },
        { value: 'Toys & Games', label: 'Toys & Games' },
        { value: 'Vehicles & Parts', label: 'Vehicles & Parts' }
    ];


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
                    isSearchable={false}
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